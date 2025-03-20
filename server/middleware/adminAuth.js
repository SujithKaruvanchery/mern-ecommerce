const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
        const { admin_token } = req.cookies;
        
        if (!admin_token) {
            return res.status(401).json({ error: 'Admin token not provided' });
        }

        const decoded = jwt.verify(admin_token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid authentication token' });
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        req.user = decoded;

        next();
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Internal server Error' })
    }
};

module.exports = { adminAuth };