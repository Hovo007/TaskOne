
const md5 = require('md5')
const {setter, deleter,} = require('../services/redisService')
const {generateToken} = require('../services/generateToken')
const {createUser, getUser, updateUser, getUserByPassword, updateUserPassword} = require('../actions/userAction')


const logIn = async (req, res, next) => {
    try {
        const user = await getUser(req.body);
        if (user) {
            const passwordResult = md5(req.body.password).match(user.password);
            if (passwordResult) {
                const token = generateToken(user);

                //baci passwordic
                const inserted = await setter(token, JSON.stringify(user));
                console.log(token);
                res.status(200).set('authorization', token).json({
                    error: false,
                    message: 'Success',
                    data: user
                })
            } else {
                const error = new Error('Passwords do not match');
                error.status = 401;
                next(error)
            }
        } else {
            res.status(404).json({
                message: 'The User not founded'
            })
        }
    } catch (e) {
        next(e)
    }
}


const register = async (req, res) => {
    try {
        const body = req.body
        body.password = md5(body.password)
        const inserted = await createUser(body);

        res.status(200).json({
            register: {
                error: false,
                message: "The registration has successfully done",
                data: req.data
            }
        })
    } catch (e) {
        console.log(e);
        res.status(404).json({
            message: e.sqlMessage
        });
    }
}


const logOut = async (req, res) => {
    try {
        const deleteToken = await deleter(req.headers.authorization)
        if (deleteToken) {
            res.status(200).json({
                message: 'The token has been removed'
            });
        }
    } catch (err) {
        res.status(404).json({
            message: err
        })
    }
}


const update = async (req, res, next) => {
    try{
        console.log("newData-->", req.body);

        const {name,surname,phone,email} = req.body

        const redisUser = req.user;
        console.log("RedisUser----->", redisUser);
        const updated = await updateUser({name,surname,phone,email},redisUser.email)
        if (updated.affectedRows) {
            const newRedisUser = {...redisUser,...{name,surname,phone}}


            await setter(req.headers.authorization, newRedisUser);
            res.status(201).json({
                success : true
            });
        }

    }catch (e) {
        next(e)
    }
}


const updatePassword = async (req, res, next) => {

    console.log('BODY => ', req.body)
    const {oldPassword, newPassword} = req.body;

    const redisUser = req.user;
    console.log("redisUser-->", redisUser);

    const oldPassHash = md5(oldPassword);
    console.log("oldPassHash-->", oldPassHash);

    const user = await getUserByPassword(oldPassHash, redisUser.email);

    if (!user) {
        const error = new Error('User doesnt find');
        next(error);
        return;
    }

    console.log('user => ', user);


    const newPassHash = md5(newPassword)
    console.log("newPassHash-->", newPassHash);


    const updated = await updateUserPassword(redisUser.email, newPassHash);
    console.log("updated-->", updated);
    if (updated.affectedRows) {
        const updatedData = {...redisUser, password: newPassHash};

        console.log('updatedData => ', updatedData)
        await setter(req.headers.authorization, updatedData);

        res.status(200).json({
            message: "The user has been updated"
        })
    }
    // console.log(user)
    // console.log(req.headers)
}

module.exports = {
    register,
    logIn,
    logOut,
    update,
    updatePassword
}