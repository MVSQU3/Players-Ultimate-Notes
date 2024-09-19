const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const playerModels = require("../models/player");
const userModels = require("../models/user");
const { players } = require("./player");

const sequelize = new Sequelize("players_ultimate_notes", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

const Player = playerModels(sequelize);
const User = userModels(sequelize);

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    players.map(async (player) => {
      await Player.create(player).then((player) =>
        console.log(player.toJSON())
      );
    });
    const hash = await bcrypt.hash("admin", 10);
    const user = await User.create({ username: "admin", password: hash });
    console.log("Utilisateur admin créé avec succès", user.toJSON());
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  initDb,
  sequelize,
  Player,
  User,
};
