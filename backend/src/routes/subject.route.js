const express = require("express");

const router = express.Router();

const subjectController = require("../controllers/subject.controller");


// Get All Subjects
router.get(
    "/",
    subjectController.getAllSubjects
);


// Get Subject By ID
router.get(
    "/:id",
    subjectController.getSubjectById
);


// Get Subject By Name
router.get(
    "/name/:name",
    subjectController.getSubjectByName
);


// Create Subject
router.post(
    "/",
    subjectController.createSubject
);


// Update Subject
router.put(
    "/:id",
    subjectController.updateSubject
);


// Delete Subject
router.delete(
    "/:id",
    subjectController.deleteSubject
);


module.exports = router;