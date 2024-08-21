var express = require("express");
var router = express.Router();
const playerController = require("../api/playerController");

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: API per gestionar jugadors
 */

router.get("/", playerController.getAllPlayers);

router.post("/", playerController.createPlayer);

router.get("/:id", playerController.getPlayerById);

router.put("/:id", playerController.updatePlayer);

router.delete("/:id", playerController.deletePlayer);

module.exports = router;