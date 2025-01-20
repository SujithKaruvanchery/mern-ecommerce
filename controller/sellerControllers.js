const SellerDB = require('../model/sellerModel')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token')

const registerSeller = async (req, res) => {
    try {
        const { name, email, mobile, password, storeName, address } = req.body;
        if (!name || !email || !mobile || !password || !storeName || !address) {
            return res.status(400).json({ error: 'All fields must be filled out.' });
        }

        const sellerAlreadyExistWithEmail = await SellerDB.findOne({ email });

        if (sellerAlreadyExistWithEmail) {
            return res.status(400).json({ error: 'Seller with this email already exists' });
        }

        const sellerAlreadyExistWithMobile = await SellerDB.findOne({ mobile });

        if (sellerAlreadyExistWithMobile) {
            return res.status(400).json({ error: 'Seller with this mobile number already exists' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newSeller = new SellerDB({
            name, email, password: hashedPassword, mobile, storeName, address
        });

        const savedSeller = await newSeller.save();
        res.status(200).json({ message: 'Seller created successfully', data: savedSeller });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const loginSeller = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'All fields must be filled out.' });
        }

        const seller = await SellerDB.findOne({ email });

        if (!seller) {
            return res.status(400).json({ error: 'No seller found with the provided details' });
        }

        const passwordMatch = await bcrypt.compare(password, seller.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Password is incorrect' });
        }

        if (!seller.isActive) {
            return res.status(400).json({ error: 'Seller profile is currently inactive' });
        }

        const token = generateToken(seller, "seller");

        res.cookie("seller_token", token);

        {
            const { password, ...sellerWithoutPassword } = seller._doc
            res.status(200).json({ message: 'Successfully logged in.', data: sellerWithoutPassword });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const sellerProfile = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const sellerData = await SellerDB.findById(sellerId).select('-password');

        if (!sellerData) {
            return res.status(404).json({ error: 'Seller not found in the system.' });
        }

        if (!sellerData.isActive) {
            return res.status(403).json({ error: 'The seller account is inactive.' });
        }
        res.status(200).json({ message: 'Seller profile loaded successfully', data: sellerData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const updateSellerProfile = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const { name, email, mobile, storeName, address } = req.body;

        if (!name && !email && !mobile && !storeName && !address) {
            return res.status(400).json({ error: 'At least one field is required to update' });
        }

        const seller = await SellerDB.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found in the system.' });
        }

        if (name) seller.name = name;
        if (email) {
            const existingSellerWithEmail = await SellerDB.findOne({ email });
            if (existingSellerWithEmail && existingSellerWithEmail._id.toString() !== sellerId) {
                return res.status(400).json({ error: 'This email is already registered.' });
            }
            seller.email = email;
        }
        if (mobile) {
            const existingSellerWithMobile = await SellerDB.findOne({ mobile });
            if (existingSellerWithMobile && existingSellerWithMobile._id.toString() !== sellerId) {
                return res.status(400).json({ error: 'This mobile number is already registered.' });
            }
            seller.mobile = mobile;
        }
        if (storeName) seller.storeName = storeName;
        if (address) seller.address = address;

        await seller.save();

        const updatedSeller = await SellerDB.findById(sellerId).select('-password');

        res.status(200).json({ message: 'Seller profile updated successfully', data: updatedSeller });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const checkSeller = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const seller = await SellerDB.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found in the system.' });
        }

        if (!seller.isActive) {
            return res.status(403).json({ error: 'The seller account is inactive.' });
        }

        return res.status(200).json({ message: 'Seller authenticated successfully', data: seller });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const logoutSeller = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const seller = await SellerDB.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found in the system.' });
        }

        if (!seller.isActive) {
            return res.status(403).json({ error: 'The seller account is inactive.' });
        }

        res.clearCookie('seller_token');

        res.status(200).json({ message: 'Successfully logged out seller', data: seller });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const deleteSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const seller = await SellerDB.findByIdAndDelete(id);

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found in the system.' });
        }

        return res.status(200).json({ message: 'Successfully deleted the seller account', data: seller });

    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const getAllSellers = async (req, res) => {
    try {
        const users = await SellerDB.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
};


module.exports = { registerSeller, loginSeller, sellerProfile, updateSellerProfile, checkSeller, logoutSeller, deleteSeller, getAllSellers }
