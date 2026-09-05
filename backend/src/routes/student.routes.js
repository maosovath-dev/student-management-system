const express = require('express');
const router = express.Router();

// const handleUploadImage = require('../middlewares/handleImageUpload');
// const productController = require('../controllers/product.controller');
const studentController = require('../controllers/student.controller')

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.get(
    '/student_code/:studentCode',
    studentController.getStudentByCode
);
// router.post('/', handleUploadImage, studentController.createStudent);
// router.delete('/:id', studentController.deleteStudent);
// router.put('/:id', handleUploadImage, studentController.updateStudent);
// router.put('/:id/image', handleUploadImage, studentController.updateStudentImage);



module.exports = router;