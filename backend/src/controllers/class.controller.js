const classServices = require('../services/class.service');
const { sendResponse } = require('../utils/responseHelper');



const getAllClasses = async (req, res) => {
    try {
        const classes = await classServices.getAllClasses();
        sendResponse(res, 200, true, 'Classes retrieved successfully', classes);
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }

}

const getClassById = async (req, res) => {
    try {
        const id = req.param.id;
        const myClass = await classServices.getClassById(id);

        if (!myClass || myClass.length === 0) {
            return sendResponse(res, 404, false, 'Class not found');
        }

        const data = Array.isArray(myClass) ? myClass[0] : myClass;
        sendResponse(res, 200, true, 'Class retrieved successfully', data);

    } catch (error) {
        sendResponse(res, 500, true, error.message);

    }

}

const createNewClass = async (req, res) => {
  try {
    const body = req.body;
    const myClass = await classServices.createNewClass(body);

    return sendResponse(res, 201, true, 'Class created successfully', myClass);
  } catch (error) {
    // ឆ្លើយតប Error message ទៅកាន់ Client
    return sendResponse(res, 400, false, error.message);
  }
};

module.exports = {
    getAllClasses,
    getClassById,
    createNewClass
}




