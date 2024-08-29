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
  const newPlayer = await Player.create({ ...req.body });
  res.json(newPlayer);
};

exports.updatePlayer = async (req, res) => {
  const id = req.params.id;
  Player.update(req.body, { where: { id: id } })
    .then((_) => {
      return Player.findByPk(id).then((player) => {
        if (!player) {
          return res.status(401).json({ message: "joueur introuvable" });
        }
        res.json({ data: player });
      });
    })
    .catch((err) => {});
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
    .catch((err) => {});
};
