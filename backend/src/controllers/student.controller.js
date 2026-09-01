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

module.exports = {
    getAllStudents
}