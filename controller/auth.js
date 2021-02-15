const md5 = require('md5')
const {setRedis, deleteUser} = require('../services/nodeRedis')
const {validation} = require('../services/validation')
const {generateToken} = require('../services/generateToken')
const {createUser, getUser} = require('../actions/userAction')


const logIn = async (req, res) => {
    const {isValid, message} = validation(req.body, true);
    if (!isValid) {
        res.status(200).json({
            error: true,
            message: message
        });
        return;
    }


    const user = await getUser(req.body);
    if (user) {
        const passwordResult = md5(req.body.password).match(user.password);
        if (passwordResult) {
            const token = generateToken(user);
            const inserted = await setRedis(token, JSON.stringify(user));
            console.log(token);
            res.status(200).set('authorization', token).json({
                error: false,
                message: 'Success',
                data: user
            })
        } else {
            res.status(401).json({
                message: 'Passwords do not match'
            })
        }
    } else {
        res.status(404).json({
            message: 'The User not founded'
        })
    }
}


const register = async (req, res) => {
    try {
        const body = req.body
        const {isValid, message} = validation(body)
        if (!isValid) {
            res.status(200).json({
                error: true,
                message: message
            });
            return;
        }

        body.password = md5(body.password)
        const inserted = await createUser(body);

        res.status(200).json({
            register: {
                error: false,
                message: "The registration has successfully done",
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
        const deleteToken = await deleteUser(req.headers.authorization)
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

module.exports = {
    register,
    logIn,
    logOut
}