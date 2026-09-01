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

const createStudent = async (data) => {
    const {student_code, first_name, last_name, gender} = data;
    if(!student_code || !first_name || !last_name || !gender){
        const error = new Error('student_code, first_name, last_name and gender are required');
        error.statusCode = 400;
        throw error;
    }
    
    const existingStudent = await studentModel.findStudentById(student_code);
    if(existingStudent){
        const error = new Error('student_code already exists');
        error.statusCode = 400;
        throw error;
    }

    
};

module.exports = {
    getAllStudents,
    findStudentById,
    createStudent
}