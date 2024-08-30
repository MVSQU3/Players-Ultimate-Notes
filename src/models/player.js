const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Player",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      note: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          notEmpty: { msg: "Le champ note est require" },
          isNumeric: { msg: "Le champ note n'autorise que les nombres" },
        },
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le champ nom est require" },
          notNumber(value) {
            const regex = /\d/;
            if (regex.test(value)) {
              throw new Error("Le nom ne peut pas contenir de chiffre");
            }
          },
        },
        set(value) {
          if (typeof value === "string") {
            this.setDataValue("nom", Capitalize(value.trim()));
          } else {
            this.setDataValue("nom", "");
          }
        },
      },
      pays: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le champ pays est require" },
          notNumber(value) {
            const regex = /\d/;
            if (regex.test(value)) {
              throw new Error("Le pays ne peut pas contenir de chiffre");
            }
          },
        },
        set(value) {
          if (typeof value === "string") {
            this.setDataValue("pays", Capitalize(value.trim()));
          } else {
            this.setDataValue("pays", "");
          }
        },
      },
      club: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le champ club est require" },
        },
        set(value) {
          if (typeof value === "string") {
            this.setDataValue("club", Capitalize(value.trim()));
          } else {
            this.setDataValue("club", "");
          }
        },
      },
      post: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le champ post est require" },
          notNumber(value) {
            const regex = /\d/;
            if (regex.test(value)) {
              throw new Error("Le post ne peut pas contenir de chiffre");
            }
          },
        },
        set(value) {
          if (typeof value === "string") {
            this.setDataValue("post", Capitalize(value.trim()));
          } else {
            this.setDataValue("post", "");
          }
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le champ âge est require" },
          isInt: { msg: "Le champ âge n'autorise que les nombre entier" },
        },
      },
      attributs_Physiques: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      attributs_Techniques: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
function Capitalize(str) {
  if (typeof str === "string") return "";
  return str.chartAt(0).toUpperCase() + str.slice(1);
}
