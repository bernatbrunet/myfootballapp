var express = require("express");
var router = express.Router();
const leagueController = require("../api/leagueController");

/**
 * @swagger
 * tags:
 *   name: Leagues
 *   description: API per gestionar lligues
 */

router.get("/", leagueController.getAllLeagues);

router.post("/", leagueController.createLeague);

router.get("/:id", leagueController.getLeagueById);

router.put("/:id", leagueController.updateLeague);

router.delete("/:id", leagueController.deleteLeague);

module.exports = router;