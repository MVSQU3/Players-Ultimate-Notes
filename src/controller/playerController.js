const { ValidationError, Op, literal } = require("sequelize");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { Player, User } = require("../db/sequelize");
const privateKey = require("../auth/privateKey");

exports.findAllPlayers = async (req, res) => {
  if (req.query.name) {
    const name = req.query.name;
    Player.findAll({
      where: {
        name: { [Op.like]: `%${name}%` },
      },
      limit: 5,
      order: ["name"],
    }).then((player) => {
      if (player.length === 0) {
        return res.status(401).json({ message: "Joueur Introuvable" });
      }
      res.json({ data: player });
    });
  } else if (req.query.note) {
    const note = parseFloat(req.query.note);

    // Vérifie que la note est un nombre valide
    if (isNaN(note)) {
      return res.status(400).json({ message: "La note fournie est invalide." });
    }

    Player.findAndCountAll({
      where: literal(`ROUND(note, 1) <= ${note}`), // Utilise literal pour arrondir et comparer
      order: [["note", "DESC"]],
    }).then(({ count, rows }) => {
      if (!count) {
        return res.status(404).json({ message: "Joueur Introuvable" });
      }
      res.json({ data: rows });
    });
  } else {
    Player.findAll({ order: ["name"] }).then((player) =>
      res.json({ data: player })
    );
  }
};

exports.findOnePlayer = async (req, res) => {
  const id = req.params.id;
  Player.findByPk(id).then((player) => {
    res.json({ data: player });
  });
};

exports.bestThreePlayers = async (req, res) => {
  Player.findAll({
    limit: 3,
    order: [["note", "DESC"]],
  })
    .then((player) => {
      const message = "Le top 3 des meilleurs notes";
      res.json({ message: message, data: player });
    })
    .catch((err) => {});
};

exports.createPlayer = async (req, res) => {
  const {
    note,
    name,
    pays,
    club,
    post,
    age,
    attributs_Physiques,
    attributs_Techniques,
  } = req.body;
  const newPlayer = await Player.create({ ...req.body })
    .then((newPlayer) => {
      console.log(req.body);

      res.json({ data: newPlayer });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res
          .status(401)
          .json({ message: error.errors.map((err) => err.message) });
      }
      const message = "Impossible de creé le joueur, Réessayez dans un instant";
      res.status(500).json({ message, data: error });
    });
};

exports.updatePlayer = async (req, res) => {
  const id = req.params.id;
  try {
    const [updatedRows] = await Player.update(req.body, { where: { id: id } });
    if (updatedRows === 0) {
      return res.status(404).json({
        message: "Joueur introuvable ou vous avez appotez aucune modificaion",
      });
    }
    const player = await Player.findByPk(id);
    res.json({ data: player });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res
        .status(400)
        .json({ message: error.errors.map((err) => err.message) });
    }
    const message =
      "Impossible de modifier le joueur, Réessayez dans un instant";
    res.status(500).json({ message, data: error });
  }
};

exports.deletePlayer = (req, res) => {
  const id = req.params.id;
  Player.findByPk(id)
    .then((player) => {
      if (!player) {
        return res.status(401).json({ message: "joueur introuvable" });
      }
      Player.destroy({ where: { id: id } }).then((_) => {
        res.json({ message: `le joueur ${player.name} bien été supprimer` });
      });
    })
    .catch((error) => {
      const message =
        "Impossible de supprimer le joueur, Réessayez dans un instant";
      res.status(500).json({ message, data: error });
    });
};

exports.login = (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (!user) {
        const message = "L'utilisateur demandé n'existe pas";
        return res.status(404).json({ message });
      }

      // bcrypt
      bcrypt
        .compare(req.body.password, user.password)
        .then((isValidPassword) => {
          if (!isValidPassword) {
            const message = "Le mot de passe n'est pas correct";
            return res.status(401).json({ message });
          }

          // jsonwebtoken
          const token = jsonwebtoken.sign({ userId: user.id }, privateKey, {
            expiresIn: "1h",
          });
          const message = "L'utilisateur est connecté avec succès";
          return res.json({ message, data: user, token });
        })
        .catch((err) => {
          const message = "Erreur lors de la vérification du mot de passe";
          return res.status(500).json({ message, data: err });
        });
    })
    .catch((err) => {
      const message = "Impossible de se connecter. Réessayez dans un instant.";
      return res.status(500).json({ message, data: err });
    });
};
