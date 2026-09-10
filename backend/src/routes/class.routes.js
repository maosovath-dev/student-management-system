const express = require('express');
const router = express.Router();

const classController = require('../controllers/class.controller');
const classSubjectController = require('../controllers/classSubject.controller');

router.get('/', classController.getAllClasses);

// Class ↔ Subject
router.post(
    "/:classId/subjects",
    classSubjectController.assignSubjectToClass
);

router.get(
    "/:classId/subjects",
    classSubjectController.getSubjectsByClass
);

router.delete(
    "/:classId/subjects/:subjectId",
    classSubjectController.removeSubjectFromClass
);

router.get('/:id', classController.getClassById);

router.post('/', classController.createNewClass);

router.put('/:id', classController.updateClass);

router.delete('/:id', classController.deleteClass);


module.exports = router;