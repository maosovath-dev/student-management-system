const pool =  require('../config/db');

const getAllStudents = async () => {
    const [rows] = await pool.query(`
    SELECT *
    FROM students
    ORDER BY id DESC
  `);

  return rows;
}

module.exports = {
    getAllStudents
}