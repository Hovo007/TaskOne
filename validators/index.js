let Ajv = require('ajv').default;
let ajv = new Ajv({allErrors: true});
const loginSchema = require('./schemas/logIn.json');
const registerSchema = require('./schemas/register.json');
const updateSchema = require('./schemas/update.json');
const updatePasswordSchema = require('./schemas/updatePassword.json');


ajv.addSchema(loginSchema, 'login');
ajv.addSchema(registerSchema, 'register');
ajv.addSchema(updateSchema, 'update');
ajv.addSchema(updatePasswordSchema, 'updatePassword');

const errorMessages = {
    type: 'invalid type',
}


const errorResponse = (schemaErrors) => {
    const errors = [];
    schemaErrors.forEach((error) => {
        console.log(error);
        const key = Object.values(error.params)[0];
        errors.push({
            params: key,
            message: error.message,
        });
    });
    return {
        message: 'Validation error',
        errors,
    };
};

let validateSchema = (schemaName) => {
    return (req, res, next) => {
        let valid = ajv.validate(schemaName, req.body)

        console.log('valid => ', valid)
        if (!valid) {
            return res.json(errorResponse(ajv.errors))
        }
        next()
    }
}

module.exports = {validateSchema}