const {getRedis} = require('../services/nodeRedis')


const checkUser = async (req, res, next) => {
    const user = await getRedis(req.headers.authorization);
    if (user) {
        res.status(200).json({
            error: false,
            message: 'Success',
            data: user
        });
        return
    }
    next();
}

module.exports = {
    checkUser
}