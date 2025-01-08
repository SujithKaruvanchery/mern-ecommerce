const UserDB = require('../model/userModel')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !email || !mobile || !password) {
            return res.status(422).json({ error: 'All fields must be filled out.' }); // 422: Unprocessable Entity
        }

        const userAlreadyExistWithEmail = await UserDB.findOne({ email });

        if (userAlreadyExistWithEmail) {
            return res.status(409).json({ error: 'This email is already registered.' }); // 409: Conflict
        }

        const userAlreadyExistWithMobile = await UserDB.findOne({ mobile });

        if (userAlreadyExistWithMobile) {
            return res.status(409).json({ error: 'This mobile number is already registered.' }); // 409: Conflict
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserDB({
            name, email, password: hashedPassword, mobile
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Account created successfully.', data: savedUser }); // 201: Created

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' }); // 500: Internal Server Error
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: 'All fields must be filled out.' }); // 422: Unprocessable Entity
        }

        const user = await UserDB.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'This email is not registered.' }); // 404: Not Found
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password is incorrect.' }); // 401: Unauthorized
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'The user account is inactive.' }); // 403: Forbidden
        }

        const token = generateToken(user, "user");

        res.cookie("user_token", token);

        res.status(200).json({ message: 'Successfully logged in.', data: user }); // 200: OK
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' }); // 500: Internal Server Error
    }
};

const userProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const userData = await UserDB.findById(userId).select('-password');

        if (!userData) {
            return res.status(404).json({ error: 'User not found in the system.' }); // 404: Not Found
        }

        if (!userData.isActive) {
            return res.status(403).json({ error: 'The user account is inactive.' }); // 403: Forbidden
        }

        res.status(200).json({ message: 'User profile loaded successfully', data: userData }); // 200: OK
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' }); // 500: Internal Server Error
    }
};

const logoutUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await UserDB.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found in the system.' }); // 404: Not Found
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'The user account is inactive.' }); // 403: Forbidden
        }

        res.clearCookie("user_token");

        res.status(200).json({ message: 'Successfully logged out user' }); // 200: OK
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' }); // 500: Internal Server Error
    }
};

const checkUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await UserDB.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found in the system.' }); // 404: Not Found
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'The user account is inactive.' }); // 403: Forbidden
        }

        return res.status(200).json({ message: 'User authenticated successfully' }); // 200: OK
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' }); // 500: Internal Server Error
    }
};


module.exports = { registerUser, loginUser, userProfile, logoutUser, checkUser };
