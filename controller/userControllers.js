const UserDB = require('../model/userModel')
const AdminDB = require('../model/adminModel')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !email || !mobile || !password) {
            return res.status(422).json({ error: 'All fields must be filled out.' });
        }

        const userAlreadyExistWithEmail = await UserDB.findOne({ email });

        if (userAlreadyExistWithEmail) {
            return res.status(409).json({ error: 'This email is already registered.' });
        }

        const userAlreadyExistWithMobile = await UserDB.findOne({ mobile });

        if (userAlreadyExistWithMobile) {
            return res.status(409).json({ error: 'This mobile number is already registered.' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserDB({
            name, email, password: hashedPassword, mobile
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Account created successfully.', data: savedUser });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: 'All fields must be filled out.' });
        }

        const user = await UserDB.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'This email is not registered.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password is incorrect.' });
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'The user account is inactive.' });
        }

        const token = generateToken(user, "user");

        res.cookie("user_token", token);

        {
            const { password, ...userWithoutPassword } = user._doc
            res.status(200).json({ message: 'Successfully logged in.', data: userWithoutPassword });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const userProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const userData = await UserDB.findById(userId).select('-password');

        if (!userData) {
            return res.status(404).json({ error: 'User not found in the system.' });
        }

        if (!userData.isActive) {
            return res.status(403).json({ error: 'The user account is inactive.' });
        }

        res.status(200).json({ message: 'User profile loaded successfully', data: userData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const logoutUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await UserDB.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found in the system.' });
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'The user account is inactive.' });
        }

        res.clearCookie("user_token");

        res.status(200).json({ message: 'Successfully logged out user', data: user });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const checkUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await UserDB.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found in the system.' });
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'The user account is inactive.' });
        }

        return res.status(200).json({ message: 'User authenticated successfully', data: user });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const { name, email, mobile } = req.body;

        if (!name && !email && !mobile) {
            return res.status(400).json({ error: "At least one field is required to update" });
        }

        if (email) {
            const existingUserWithEmail = await UserDB.findOne({ email });
            if (existingUserWithEmail && existingUserWithEmail._id.toString() !== userId) {
                return res.status(400).json({ error: 'This email is already registered.' });
            }
        }

        if (mobile) {
            const existingUserWithMobile = await UserDB.findOne({ mobile });
            if (existingUserWithMobile && existingUserWithMobile._id.toString() !== userId) {
                return res.status(400).json({ error: 'This mobile number is already registered.' });
            }
        }

        const user = await UserDB.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found in the system.' });
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'The user account is inactive.' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (mobile) user.mobile = mobile;

        await user.save();

        const updatedUser = await UserDB.findById(userId).select("-password");

        res.status(200).json({ message: 'User profile updated successfully', data: updatedUser });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const deactivateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const adminId = req.user.id;

        const user = await UserDB.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found in the system.' });
        }

        const admin = await AdminDB.findById(adminId);
        if (!admin || admin.role !== "admin") {
            return res.status(403).json({ message: 'Only admins can access this resource' });
        }

        if (!user.isActive) {
            return res.status(400).json({ message: 'User is already deactivated' });
        }

        user.isActive = false;
        await user.save();

        return res.status(200).json({ message: 'User deactivated successfully', data: user });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const activateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const adminId = req.user.id;

        const user = await UserDB.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found in the system.' });
        }

        const admin = await AdminDB.findById(adminId);
        if (!admin || admin.role !== "admin") {
            return res.status(403).json({ message: 'Only admins can access this resource' });
        }

        if (user.isActive) {
            return res.status(400).json({ message: 'User is already activated' });
        }

        user.isActive = true;
        await user.save();

        return res.status(200).json({ message: 'User activated successfully', data: user });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserDB.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found in the system.' });
        }

        return res.status(200).json({ message: 'Successfully deleted the user account', data: user });

    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

module.exports = { registerUser, loginUser, userProfile, logoutUser, checkUser, updateUserProfile, deactivateUser, activateUser, deleteUser };
