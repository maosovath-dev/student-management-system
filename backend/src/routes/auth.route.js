const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const { isLogin} = require("../middleware/auth.middleware");

const {allowRoles} = require("../middleware/role.middleware");


// Login
router.post("/login", authController.login);

// Verify OTP
router.post("/verify-email", authController.verifyEmail);

// Resend OTP
router.post("/resend-otp", authController.resendVerifyOTP);

// Set password
router.post("/set-password", authController.setPassword);


// ADMIN ONLY
router.post("/admin/create-user", isLogin, allowRoles("admin"), authController.createUserByAdmin);


// AUTHENTICATED USER

// Get current user
router.get("/me",isLogin,authController.getMe);

// Logout
router.post("/logout", isLogin,authController.logout);


module.exports = router;