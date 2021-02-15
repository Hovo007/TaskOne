const md5 = require('md5')

const generateToken = (body) => {
    return md5("" + (new Date()).getTime() + JSON.stringify(body))
};

module.exports = {
    generateToken
}
