const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') //header that the user is supposed to provide
        const decoded = jwt.verify(token, process.env.JSW_TOKEN) // validates the user
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // find the associated user

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next() //for further operations to continue after authentication
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' }) //if not authenticated
    }
}

module.exports = auth