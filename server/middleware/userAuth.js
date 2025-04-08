const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ error: 'No token provided by user' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: 'User is not authorized' });
        }

        req.user = decoded;
        next();

    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Internal server Error' })
    }
};


module.exports = { userAuth };