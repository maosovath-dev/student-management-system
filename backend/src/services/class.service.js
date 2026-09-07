const classModel = require('../models/class.model');

const getAllClasses = async () => {
    const resultClass = await classModel.getAllClasses();

    return resultClass;
}

const getClassById = async (id) => {
    const resultClass = await classModel.getClassById(id);

    if(resultClass.lenght === 0){
         throw new Error('Student not found!');
    }

    return getClassById;

}

const createNewClass = async (body) => {
    if(!body.name || body.name.trim() === ''){
        throw new Error('Class name is required');
    }

    const existingClass = await classModel.getClassByName(body.name);
    if (existingClass) {
        throw new Error("Class already exists");
    } 

    // 1. បង្កើត class ថ្មី និងយក id
    const classId = await classModel.createNewClass(body);

    // 2. Query យក Object ពេញលេញតាមរយៈ classId នោះមកវិញ
    const newClass = await classModel.getClassById(classId);

    return newClass; // 👈 ត្រឡប់ Object ពេញលេញ ({ id: 1, name: "...", description: "...", created_at: "..." })
}



const updateClass = async () => {
 
 
}

const deleteClass = async () => {

}



module.exports = {
    getAllClasses,
    getClassById,
    createNewClass,
    updateClass,
    deleteClass
}