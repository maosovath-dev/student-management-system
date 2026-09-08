const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
const studentRoute = require('./routes/student.routes');
const classRoute = require('./routes/class.routes')
const subjectRoute = require('./routes/subject.route');
const scoreRoute = require('./routes/score.route');
const attendanceRoute = require('./routes/attendance.routes');


app.use('/api/student', studentRoute);
app.use('/api/class', classRoute);
app.use('/api/subjects', subjectRoute);
app.use('/api/scores', scoreRoute);
app.use('/api/attendance', attendanceRoute);

// Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});