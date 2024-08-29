const express = require("express");
const app = express();
const port = 3000;
const sequelize = require("./src/db/sequelize");
const playerRoutes = require("./src/routes/playerRoutes");

app.use(express.json());

// Routes
app.use("/api/players", playerRoutes);
app.use("/api/players/:id", playerRoutes);

sequelize
  .initDb()
  .then(() => {
    app.listen(port, () => console.log(`Server start on port: ${port}`));
  })
  .catch((error) => {
    console.error("Unable to initialize the database:", error);
  });
