const user = require("../models/user.model");
const otpModel = require("../models/otp.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const jwtConfig = require("../config/jwt");
const mailService = require("../services/mail.service");


// Generate 6-digit OTP
const generateOTP = () => {
    return crypto
        .randomInt(100000, 1000000)
        .toString();
};


// =====================================================
// ADMIN CREATE TEACHER / STUDENT
// =====================================================

const createUserByAdmin = async (body) => {

    const allowedRoles = [
        "teacher",
        "student"
    ];

    if (!allowedRoles.includes(body.role)) {
        throw new Error(
            "Admin can only create Teacher or Student"
        );
    }


    // Check email
    const existingUser =
        await user.findByEmail(body.email);

    if (existingUser) {
        throw new Error(
            "Email already exists"
        );
    }


    // Create user
    const userId = await user.create({
        name: body.name,
        email: body.email,
        role: body.role,
        status: "active",
        is_verified: 0
    });


    // Generate OTP
    const otpCode = generateOTP();


    // OTP expires after 5 minutes
    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );


    // Delete old OTP
    await otpModel.deleteOldOtp(
        userId,
        "email_verify"
    );


    // Save OTP
    await otpModel.createOtp(
        userId,
        otpCode,
        "email_verify",
        expiresAt
    );


    // Send OTP email
    await mailService.sendOTPEmail(
        body.email,
        otpCode
    );


    return await user.findById(userId);
};


// VERIFY OTP

const verifyEmail = async (email, otpCode) => {

    if (!email || !otpCode) {
        throw new Error("Email and OTP are required");
    }
    const userInfo = await user.findByEmail(email);

    if (!userInfo) {
        throw new Error("Email not found");
    }

    if (userInfo.is_verified) {
        throw new Error("Account already verified");
    }

    const otpInfo = await otpModel.findValidOtp(userInfo.id, otpCode, "email_verify");

    if (!otpInfo) {
        throw new Error("Invalid or expired OTP");
    }

    // Verify account
    await user.verifyEmail(userInfo.id);

    // Mark OTP used
    await otpModel.markOtpUsed(otpInfo.id);


    // Temporary setup token
    const setupToken = jwt.sign(
        {
            id: userInfo.id,
            purpose: "set_password"
        },
        jwtConfig.secret,
        {
            expiresIn: "15m"
        }
    );


    return {
        message:
            "Account verified successfully",

        setupToken
    };
};


// =====================================================
// SET PASSWORD
// =====================================================

const setPassword = async (
    setupToken,
    newPassword
) => {

    if (!setupToken || !newPassword) {
        throw new Error(
            "Setup token and password are required"
        );
    }


    let decoded;

    try {

        decoded = jwt.verify(setupToken, jwtConfig.secret);

    } catch (error) {

        throw new Error("Invalid or expired setup token");
    }

    if (
        decoded.purpose !== "set_password") {

        throw new Error("Invalid setup token");
    }


    const userInfo = await user.findById(decoded.id);


    if (!userInfo) {
        throw new Error("User not found");
    }

    if (!userInfo.is_verified) {
        throw new Error("Please verify OTP first");
    }


    // Hash password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    // Save password
    await user.updatePassword(userInfo.id, hashPassword);

    return {
        message: "Password created successfully"
    };
};


// =====================================================
// LOGIN
// =====================================================

const login = async (body) => {

    const userInfo = await user.findByEmail(body.email);

    if (!userInfo) {
        throw new Error("Email or password is invalid");
    }

    if (userInfo.status !== "active") {
        throw new Error("Your account is inactive");
    }

    if (!userInfo.is_verified) {
        throw new Error("Please verify your account first");
    }

    if (!userInfo.password) {
        throw new Error("Please set your password first");
    }

    // Compare password
    const isMatch = await bcrypt.compare(body.password, userInfo.password);


    if (!isMatch) {
        throw new Error(
            "Email or password is invalid"
        );
    }


    // Generate JWT
    const token = jwt.sign(
        {
            id: userInfo.id,
            email: userInfo.email,
            role: userInfo.role
        },
        jwtConfig.secret,
        {
            expiresIn:
                jwtConfig.expiresIn
        }
    );


    // Save token
    await user.addToken(
        token,
        userInfo.id
    );


    return {
        user: {
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            role: userInfo.role
        },

        token
    };
};


// =====================================================
// GET ME
// =====================================================

const getMe = async (id) => {

    const userInfo =
        await user.findById(id);


    if (!userInfo) {
        throw new Error(
            "User not found"
        );
    }


    return userInfo;
};


// =====================================================
// LOGOUT
// =====================================================

const logout = async (id) => {

    await user.deleteToken(id);


    return {
        message:
            "Logout successful"
    };
};


// =====================================================
// RESEND OTP
// =====================================================

const resendVerifyOTP = async (
    email
) => {

    const userInfo =
        await user.findByEmail(email);


    if (!userInfo) {
        throw new Error(
            "Email not found"
        );
    }

    if (userInfo.is_verified) {
        throw new Error(
            "Account already verified"
        );
    }


    // Delete old OTP
    await otpModel.deleteOldOtp(
        userInfo.id,
        "email_verify"
    );


    // New OTP
    const otpCode = generateOTP();


    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );


    await otpModel.createOtp(
        userInfo.id,
        otpCode,
        "email_verify",
        expiresAt
    );


    await mailService.sendOTPEmail(email, otpCode);


    return {
        message:
            "OTP sent successfully"
    };
};


module.exports = {
    createUserByAdmin,
    verifyEmail,
    setPassword,
    login,
    getMe,
    logout,
    resendVerifyOTP
};