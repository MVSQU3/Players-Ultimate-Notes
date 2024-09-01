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
        get() {
          return CalculNote(
            this.attributs_Physiques,
            this.attributs_Techniques
          );
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le champ name est require" },
          notNumber(value) {
            const regex = /\d/;
            if (regex.test(value)) {
              throw new Error("Le name ne peut pas contenir de chiffre");
            }
          },
        },
        set(value) {
          if (typeof value === "string") {
            this.setDataValue("name", Capitalize(value.trim()));
          } else {
            this.setDataValue("name", "");
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
        validate: {
          isValidAttributs(value) {
            const keys = ["agilite", "endurance", "force", "vitesse"];
            ValideAttributes(value, keys, "Techniques");
          },
        },
      },
      attributs_Techniques: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          isValideAttributs(value) {
            const keys = ["controle_de_balle", "dribble", "passes", "tir"];
            ValideAttributes(value, keys, "Physiques");
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
// Helper function

// ValideAttributs function
function ValideAttributes(value, keys, type) {
  if (typeof value !== "object" || value === null) {
    throw new Error(`Les attributs ${type} doivent être un objet valide.`);
  }
  const valid = keys.every(
    (key) =>
      value.hasOwnProperty(key) &&
      typeof value[key] === "number" &&
      value[key] >= 0 &&
      value[key] <= 10
  );
  if (!valid) {
    throw new Error(
      `Les attributs ${type} ne sont pas valides. Les clés attendues sont : ${keys.join(
        ", "
      )} avec des valeurs entre 0 et 10.`
    );
  }
}

// function calculnote
function CalculNote(attributsPhy, attributsTec) {
  const sumattPhy = Object.values(attributsPhy || {}).reduce(
    (acc, val) => acc + val
  );
  const sumAttTec = Object.values(attributsTec || {}).reduce(
    (acc, val) => acc + val
  );
  return (sumattPhy + sumAttTec) / 10;
}

// Capitalize funcion
function Capitalize(str) {
  if (typeof str === "string") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
