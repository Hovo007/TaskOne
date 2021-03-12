const {getter} = require('../services/redisService')


const checkUser = async (req, res, next) => {
    try{
        const user = await getter(req.headers.authorization);
        // console.log('user => ', user)
        if (!user) {
            throw new Error('auth  error');
        }
        req.user = user;
        next()
    }catch (e){
       next(e)
    }
}

module.exports = {
    checkUser
}