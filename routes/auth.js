const express = require('express')
const {checkUser} = require('../middlwares/middlwareAuth')
const {logIn, register, logOut,update,updatePassword} = require('../controller/auth')

const {validateSchema} = require('../validators')
const router = express.Router()

router.post('/login', validateSchema('logIn'),logIn)
router.post('/register',validateSchema('register'), register)
router.post('/logOut', checkUser,logOut)
router.put('/update',checkUser,validateSchema('update'), update)
router.put('/updatePassword',checkUser,validateSchema('updatePassword'), updatePassword)


module.exports = router