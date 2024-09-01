const express = require("express");
const app = express();
const port = 3000;
const sequelize = require("./src/db/sequelize");
const playerRoutes = require("./src/routes/playerRoutes");

app.use(express.json());

// Routes
app.use(playerRoutes);

app.use(({ res }) => {
  const message =
    "impossible de trouver la ressource damandée ! vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

// Connexion à la base de données*
sequelize
  .initDb()
  .then(() => {
    app.listen(port, () => console.log(`Server start on port: ${port}`));
  })
  .catch((error) => {
    console.error("Unable to initialize the database:", error);
  });
