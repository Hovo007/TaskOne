const {EMAIL_REGEXP, PASSWORD_REGEXP, PHONE_REGEXP} = require('../constants/regexpConst')

const validation = (body, isLogin = false) => {
    if (!isLogin) {
        if (!body.name) {
            return {
                isValid: false,
                message: "Please fill your name"
            }
        } else if (body.name.length <= 3 || body.name.lengh > 25) {
            return {
                isValid: false,
                message: "Your name must be min 4 elements or max 25 elements"
            }
        }
        if (!body.surname) {
            return {
                isValid: false,
                message: "Please fill your surname"
            }
        } else if (body.surname.length <= 4 || body.surname.length > 25) {
            return {
                isValid: false,
                message: "Your surname must be min 5 or max 25 elements"
            }
        }
    }
    if (!body.phone) {
        return {
            isValid: false,
            message: "Please fill your phone number"
        }
    } else if (!PHONE_REGEXP.test(body.phone)) {
        return {
            isValid: false,
            message: "Your phone number must includes only numbers"
        }
    }

    if (!body.email) {
        return {
            isValid: false,
            message: "Please fill your email"
        }
    } else if (!EMAIL_REGEXP.test(String(body.email).toLowerCase())) {
        return {
            isValid: false,
            message: "Please fill correct email"
        }
    }
    if (!body.password) {
        return {
            isValid: false,
            message: "Please fill your password"
        }
    } else if (!PASSWORD_REGEXP.test(body.password)) {
        return {
            isValid: false,
            message: "Your password must includes Upper and Lowercase, symbols and digits"
        }
    }
    return {isValid: true}
}

module.exports = {validation}
