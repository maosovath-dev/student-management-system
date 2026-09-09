const authService = require("../services/auth.service");
const { sendResponse } = require("../utils/responseHelper");

const createUserByAdmin = async (req, res) => {
    try {
        const result = await authService.createUserByAdmin(req.body);

        return sendResponse(
            res,
            201,
            true,
            "Account created successfully. OTP has been sent to the user's email.",
            result
        );
    } catch (error) {

        return sendResponse(res, 400, false, error.message);
    }
};

// LOGIN

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        return sendResponse(res, 200, true, "Login successfully", result);

    } catch (error) {

        return sendResponse(res, 401, false, error.message);
    }
};

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const result = await authService.verifyEmail(email, otp);

        return sendResponse(
            res,
            200,
            true,
            result.message,
            {
                setupToken: result.setupToken
            }
        );

    } catch (error) {

        return sendResponse(res, 400, false, error.message);

    }
};

// SET PASSWORD

const setPassword = async (req, res) => {
    try {
        const { setupToken, password } = req.body;

        const result = await authService.setPassword(setupToken, password);

        return sendResponse(res, 200, true, result.message);

    } catch (error) {

        return sendResponse(res, 400, false, error.message);
    }
};

// RESEND OTP

const resendVerifyOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await authService.resendVerifyOTP(email);

        return sendResponse(res, 200, true, result.message);

    } catch (error) {
        return sendResponse(res, 400, false, error.message);
    }
};

// GET ME

const getMe = async (req, res) => {
    try {
        const result = await authService.getMe(req.user.id);

        return sendResponse(res, 200, true, "Get profile successfully", result);

    } catch (error) {

        return sendResponse(res, 400, false, error.message);

    }
};

// LOGOUT

const logout = async (req, res) => {
    try {
        const result = await authService.logout(req.user.id);
        
        return sendResponse(res, 200, true, result.message);

    } catch (error) {

        return sendResponse(res, 400, false, error.message);

    }
};

module.exports = {
    createUserByAdmin,
    login,
    verifyEmail,
    setPassword,
    resendVerifyOTP,
    getMe,
    logout
};