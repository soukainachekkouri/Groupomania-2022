const jwt = require('jsonwebtoken');
const { use } = require('../routes/user');

module.exports = (req, res, next) => {
    //je récupère le token
    try {
        const token = req.headers.authorization.split('')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: use
        };
    } catch (error) {
        res.status(401).jeson({ error });
    }
};