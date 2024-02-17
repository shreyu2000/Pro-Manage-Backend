const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/ApiResponse');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return ApiResponse(res, 400, 'User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // const user = await User.findById(newUser._id).select("-password");

        // Generate JWT token
        const token = generateAccessToken(newUser);

        ApiResponse(res, 201, 'User registered successfully', { name: newUser.name, token  });
    } catch (error) {
        console.error('Error registering user:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return ApiResponse(res, 401, 'Invalid email or password');
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return ApiResponse(res, 401, 'Invalid email or password');
        }

        // Generate JWT token
        const token = generateAccessToken(user);

        ApiResponse(res, 200, 'Login successful', { name: user.name, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

// Helper function to generate JWT token
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

module.exports = { registerUser, loginUser };

