const express = require("express");

const router = express.Router();

const subjectController = require("../controllers/subject.controller");


router.get("/",subjectController.getAllSubjects);

router.get("/:id", subjectController.getSubjectById);

router.get("/name/:name", subjectController.getSubjectByName);

router.post("/", subjectController.createSubject);

router.put("/:id", subjectController.updateSubject);

router.delete("/:id",subjectController.deleteSubject);


module.exports = router;