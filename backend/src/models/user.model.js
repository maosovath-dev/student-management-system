const pool = require("../config/db");


// Find user by email
const findByEmail = async (email) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            name,
            email,
            password,
            role,
            status,
            is_verified,
            token,
            created_at,
            updated_at
        FROM users
        WHERE email = ?`,
        [email]
    );

    return rows[0];
};


// Find user by ID
const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            name,
            email,
            role,
            status,
            is_verified,
            created_at,
            updated_at
        FROM users
        WHERE id = ?`,
        [id]
    );

    return rows[0];
};


// Create Teacher / Student
const create = async (body) => {
    const [result] = await pool.query(
        `INSERT INTO users
        (
            name,
            email,
            role,
            status,
            is_verified
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
            body.name,
            body.email,
            body.role,
            body.status || "active",
            body.is_verified || 0
        ]
    );

    return result.insertId;
};


// Update password
const updatePassword = async (id, password) => {
    await pool.query(
        `UPDATE users
         SET password = ?
         WHERE id = ?`,
        [password, id]
    );
};


// Verify email
const verifyEmail = async (id) => {
    await pool.query(
        `UPDATE users
         SET is_verified = 1
         WHERE id = ?`,
        [id]
    );
};


// Save JWT token
const addToken = async (token, id) => {
    await pool.query(
        `UPDATE users
         SET token = ?
         WHERE id = ?`,
        [token, id]
    );
};


// Find user by JWT token
const getByToken = async (token) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            name,
            email,
            role,
            status,
            is_verified,
            token
        FROM users
        WHERE token = ?`,
        [token]
    );

    return rows[0];
};


// Delete token when logout
const deleteToken = async (id) => {
    await pool.query(
        `UPDATE users
         SET token = NULL
         WHERE id = ?`,
        [id]
    );
};


module.exports = {
    findByEmail,
    findById,
    create,
    updatePassword,
    verifyEmail,
    addToken,
    getByToken,
    deleteToken
};