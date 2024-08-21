var express = require("express");
var router = express.Router();
const teamController = require("../api/teamController");

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: API per gestionar equips
 */

router.get("/", teamController.getAllTeams);

router.post("/", teamController.createTeam);

router.get("/:id", teamController.getTeamById);

router.put("/:id", teamController.updateTeam);

router.delete("/:id", teamController.deleteTeam);

module.exports = router;