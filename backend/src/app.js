const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
const studentRoute = require('./routes/student.routes');

app.use('/api/student', studentRoute);

// Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});