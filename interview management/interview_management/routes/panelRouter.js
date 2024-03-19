const express = require("express");

const {
  panels_availability,
  addpanel,
  search,
  getByInterviewTypeId,
} = require("../controllers/panelSearch");

const router = express.Router();

router.post("/addPanel", addpanel);
router.post("/addPanelAvail", panels_availability);
router.post("/search", search);
router.get(
  "/getInterviewtypebyId/:id",
  getByInterviewTypeId,
);

module.exports = router;
