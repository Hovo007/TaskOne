const express = require('express')
const {checkUser} = require('../middlwares/middlwareAuth')
const {logIn, register, logOut} = require('../controller/auth')
const router = express.Router()

router.post('/login', checkUser, logIn)
router.post('/register', register)
router.post('/logOut', logOut)


module.exports = router