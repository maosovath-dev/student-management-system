const express = require('express');
const router = express.Router();

const classController = require('../controllers/class.controller');
router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.post('/', classController.createNewClass);


module.exports = router;