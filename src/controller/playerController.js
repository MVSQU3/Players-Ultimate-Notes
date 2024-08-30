const { ValidationError } = require("sequelize");
const { Player } = require("../db/sequelize");

exports.findAllPlayers = async (req, res) => {
  Player.findAll().then((player) => {
    res.json({ data: player });
  });
};

exports.findOnePlayer = async (req, res) => {
  const id = req.params.id;
  Player.findByPk(id).then((player) => {
    res.json({ data: player });
  });
};

exports.createPlayer = async (req, res) => {
  const {
    note,
    nom,
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
        res.json({ message: `le joueur ${player.nom} bien été supprimer` });
      });
    })
    .catch((error) => {
      const message =
        "Impossible de supprimer le joueur, Réessayez dans un instant";
      res.status(500).json({ message, data: error });
    });
};
