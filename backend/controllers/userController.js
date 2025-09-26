const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult, cookie } = require("express-validator")

exports.signup = async (req, res) => {
    try {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const {
            firstName,
            lastName,
            email,
            password,
            confirmpassword,
            role
        } = req.body;


        if (
            !firstName ||
            !confirmpassword ||
            !email ||
            !password ||
            !role
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password does not matched",
            });
        }
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json({
                success: false,
                message: "user is already registered",
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedpassword,
            role,
        });
        return res.status(200).json({
            success: true,
            messgae: "User registered Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        });
    }
};

//login 

exports.login = async (req, res) => {
    try {
        const validationErr = validationResult(req);
        if (!validationErr.isEmpty()) {
            return res.status(400).json({ errors: validationErr.array() });
        }
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist, please sign up",
            });
        }

        if (await bcrypt.compare(password, existingUser.password)) {
            const payload = {
                email: existingUser.email,
                id: existingUser._id,
                role: existingUser.role,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            res.cookie('token', token);

            existingUser.token = token;
            existingUser.password = undefined;

            return res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                user: existingUser
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login failure, please try again",
        });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(400).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "Login First "
        })
    }
}
exports.profile = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const user = await User.findById(data.id);
        console.log("user details", user)

        return res.status(200).json({
            success: true,
            message: "Profile Fetched Successfully",
            user
        })
    } catch (error) {
        return res.status(200).json({
            success: true,
            message: "Unauthorised User "
        })
    }
}