const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendance.controller");

// Get All Attendance
router.get(
    "/",
    attendanceController.getAllAttendance
);

// Get Attendance By Student
router.get(
    "/student/:studentId",
    attendanceController.getAttendanceByStudent
);

// Get Attendance By ID
router.get(
    "/:id",
    attendanceController.getAttendanceById
);

// Create Attendance
router.post(
    "/",
    attendanceController.createAttendance
);

// Update Attendance
router.put(
    "/:id",
    attendanceController.updateAttendance
);

// Delete Attendance
router.delete(
    "/:id",
    attendanceController.deleteAttendance
);

module.exports = router;