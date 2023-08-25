const express = require("express");
const router = express.Router();

const {
  getAllTeams,
  getATeam,
  addNewTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teams");

router.route("/").post(addNewTeam).get(getAllTeams);
router.route("/:id").get(getATeam).delete(deleteTeam).patch(updateTeam);

module.exports = router;
