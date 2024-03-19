const express = require("express");
const {
  getCandidateStatus,
  postAddCandidateStatus,
  deleteCandidateStatus,
  updateCandidateStatus,
  getCandidateStatusById,
  getAllCandidateStatus,
  updateCandidateStatusIsAction,
  getAllCandidateStatuses,
} = require("../controller/candidateStatusController");

const router = express.Router();

router.get("/all", getAllCandidateStatus);
router.get(
  "/all-candidate-status",
  getAllCandidateStatuses,
);
router.get("/", getCandidateStatus);
router.get("/:id", getCandidateStatusById);
router.post("/", postAddCandidateStatus);
router.put("/:id", updateCandidateStatus);
router.put("/isAction/:id", updateCandidateStatusIsAction);
router.delete("/:id", deleteCandidateStatus);

module.exports = router;
