const pool = require("../config/db");

const getAllStudents = async () => {
  const [rows] = await pool.query(` SELECT * FROM students ORDER BY id DESC `);
  return rows;
};

const findStudentById = async (studentCode) => {
  const [rows] = await pool.query(` SELECT * FROM students WHERE id = ? `, [
    id,
  ]);
  return rows;
};

const findStudentByCode = async (studentCode) => {
  const [rows] = await pool.query(
    ` SELECT * FROM students WHERE student_code = ? `,
    [studentCode],
  );
  return rows;
};

// ==== Create Student

const createStudent = async (body) => {
  const arr = [
    body.user_id || null,
    body.student_code,
    body.first_name,
    body.last_name,
    body.gender,
    body.date_of_birth || null,
    body.phone || null,
    body.address || null,
  ];
  
  const [result] = await pool.query(
    ` INSERT INTO students ( user_id,
        student_code,
        first_name,
        last_name,
        gender,
        date_of_birth,
        phone,
        address )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?) `,
    arr,);
  return result.insertId;
};

// ============= Update Student
const updateStudent = async (id, body) => {
  const arr = [
    body.student_code,
    body.first_name,
    body.last_name,
    body.gender,
    body.date_of_birth || null,
    body.phone || null,
    body.address || null,
    id,
  ];

  const [result] = await pool.query(` 
    UPDATE students 
    SET 
        student_code = ?, 
        first_name = ?,
        last_name = ?,
        gender = ?,
        date_of_birth = ?,
        phone = ?,
        address = ?
    WHERE id = ? 
    `,arr,);
  return result;
};

// ========= Delete Student

const deleteStudent = async (id) => {
  const [result] = await pool.query(` DELETE FROM students WHERE id = ? `, [
    id,
  ]);
  return result;
};

module.exports = {
  getAllStudents,
  findStudentById,
  findStudentByCode,
  createStudent,
  updateStudent,
  deleteStudent
};
