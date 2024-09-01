const express = require("express");
const router = express.Router();
const playerController = require("../controller/playerController");
const auth = require("../auth/auth");

router.get("/api/players", auth, playerController.findAllPlayers);
router.get("/api/players/:id", auth, playerController.findOnePlayer);
router.post("/api/players", auth, playerController.createPlayer);
router.post("/api/login", auth, playerController.login);
router.put("/api/players/:id", auth, playerController.updatePlayer);
router.delete("/api/players/:id", auth, playerController.deletePlayer);

module.exports = router;
