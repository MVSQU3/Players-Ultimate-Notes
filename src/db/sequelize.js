const { Sequelize, DataTypes } = require("sequelize");
const playerModels = require("../models/player");
const { player } = require("./player");

const sequelize = new Sequelize("players_ultimate_notes", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

const Player = playerModels(sequelize);

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    player.map((player) => {
      Player.create(player).then((player) => console.log(player.toJSON()));
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  initDb,
  sequelize,
  Player,
};
