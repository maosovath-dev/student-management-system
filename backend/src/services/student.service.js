const studentModel = require('../models/student.model');

const getAllStudents = async () => {
    const students = await studentModel.getAllStudents();

    return students;
}

module.exports = {
    getAllStudents
}