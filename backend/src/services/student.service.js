const studentModel = require('../models/student.model');

const getAllStudents = async () => {
    const students = await studentModel.getAllStudents();

    return students;
}

const findStudentById = async (id) => {
    const student = await studentModel.findStudentById(id);
    if(!student){
        const error = new Error('Student not found');
        error.statusCode = 404;
        throw error;
    }
    return student;
    
};


module.exports = {
    getAllStudents,
    findStudentById,
}