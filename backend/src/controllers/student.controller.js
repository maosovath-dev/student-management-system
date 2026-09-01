const studentService = require('../services/student.service');
const {sendResponse} = require('../utils/responseHelper');

const getAllStudents = async (req, res) => {
    try{
        const students = await studentService.getAllStudents();
        sendResponse(res, 200, true, 'Students retrieved successfully', students);

    }catch(error){
        sendResponse(res, 500, false, error.message);
    }

}
const findStudentById = async (req, res) => {
    try{
        const studentCode = req.params.studentCode;
        const student = await studentService.findStudentById(studentCode);
        if(student.length === 0){
            sendResponse(res, 404, false, 'Student not found');
        }else{
            sendResponse(res, 200, true, 'Student retrieved successfully', student);
        }  
    }catch(error){
        sendResponse(res, 500, false, error.message);
    }
}

module.exports = {
    getAllStudents,
    findStudentById
}