const jwt = require('jsonwebtoken')
const keys = require("../config/database.config");
const passport = require("passport");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, keys.secretOrKey)
        req.userData = decoded
        next()
    }
    catch (error) {
        return res.status(401).json({
            message: 'auth failed'
        })
    }
}