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
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validation: {
          is: /^[a-zA-Z]+$/,
          notEmpty: { msg: "Le champ nom est require" },
          
        },
      },
      pays: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      club: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      timestamps: false,
    }
  );
};
