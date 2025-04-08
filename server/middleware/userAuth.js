const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    try {
        const { user_token } = req.cookies;

        if (!user_token) {
            return res.status(401).json({ error: 'No token provided by user' });
        }

        const decoded = jwt.verify(user_token, process.env.JWT_SECRET);

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