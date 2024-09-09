const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Définition du modèle Player
  const Player = sequelize.define(
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
          notEmpty: { msg: "Le champ note est requis" },
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
          notEmpty: { msg: "Le champ name est requis" },
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
          notEmpty: { msg: "Le champ pays est requis" },
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
          notEmpty: { msg: "Le champ club est requis" },
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
          notEmpty: { msg: "Le champ post est requis" },
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
          notEmpty: { msg: "Le champ âge est requis" },
          isInt: { msg: "Le champ âge n'autorise que les nombres entiers" },
        },
      },
      attributs_Physiques: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          isValidAttributs(value) {
            const keys = ["agilite", "endurance", "force", "vitesse"];
            ValideAttributes(value, keys, "Physiques");
          },
        },
      },
      attributs_Techniques: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          isValideAttributs(value) {
            const keys = ["controle_de_balle", "dribble", "passes", "tir"];
            ValideAttributes(value, keys, "Techniques");
          },
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "comment",
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );

  // Hook pour calculer la note avant de sauvegarder
  Player.beforeCreate((player) => {
    player.note = CalculNote(
      player.attributs_Physiques,
      player.attributs_Techniques
    );
  });

  Player.beforeUpdate((player) => {
    player.note = CalculNote(
      player.attributs_Physiques,
      player.attributs_Techniques
    );
  });

  return Player;
};

// Helper function
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

// Fonction pour calculer la note
function CalculNote(attributsPhy, attributsTec) {
  const sumattPhy = Object.values(attributsPhy || {}).reduce(
    (acc, val) => acc + val,
    0
  );
  const sumAttTec = Object.values(attributsTec || {}).reduce(
    (acc, val) => acc + val,
    0
  );
  return (sumattPhy + sumAttTec) / 10;
}

// Fonction pour capitaliser les chaînes de caractères
function Capitalize(str) {
  if (typeof str === "string") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
