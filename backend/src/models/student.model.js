const pool = require("../config/db");

const getAllStudents = async () => {
    const [rows] = await pool.query(`SELECT * FROM students ORDER BY id DESC `);

    return rows;
};

const findStudentById = async (studentCode) => {
    const [rows] = await pool.query(` SELECT * FROM students WHERE student_code = ? `,
        [studentCode],);

    return rows;
};

const createStudent = async (body) => {
    const arr = [
        body.user_id,
        body.student_code,
        body.first_name,
        body.last_name,
        body.gender,
        body.date_of_birth,
        body.phone,
        body.email,
        body.address,
        body.photo_url,
        body.status,
    ];
    const [result] = await pool.query(
        `INSERT INTO students (user_id, student_code, first_name, last_name, gender, date_of_birth, phone_number, email, address, photo_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        arr
    );
    return result.insertId;
};

module.exports = {
    getAllStudents,
    findStudentById,
    createStudent,
};
