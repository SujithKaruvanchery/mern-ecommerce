const SellerDB = require('../model/sellerModel')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token')

const registerSeller = async (req, res) => {
    try {
        const { name, email, mobile, password, role, storeName, address } = req.body;
        if (!name || !email || !mobile || !password || !role || !storeName || !address) {
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
        console.log(hashedPassword);

        const newSeller = new SellerDB({
            name, email, password: hashedPassword, mobile, role, storeName, address
        });

        const savedSeller = await newSeller.save();
        res.status(200).json({ message: 'Seller created successfully', data: savedSeller });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = { registerSeller }
