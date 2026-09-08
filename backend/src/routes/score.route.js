const express = require("express");

const router = express.Router();

const scoreController = require("../controllers/score.controller");

// Get All Scores
router.get(
    "/",
    scoreController.getAllScores
);

// Get Scores By Student
router.get(
    "/student/:studentId",
    scoreController.getScoresByStudent
);

// Get Score By ID
router.get(
    "/:id",
    scoreController.getScoreById
);

// Create Score
router.post(
    "/",
    scoreController.createScore
);

// Update Score
router.put(
    "/:id",
    scoreController.updateScore
);

// Delete Score
router.delete(
    "/:id",
    scoreController.deleteScore
);

module.exports = router;