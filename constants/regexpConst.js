const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,255}$/;
// const phone = /^\d+$/;
const phone = /(([+374]{4}|[0]{1}))?([1-9]{2})(\d{6})/

module.exports = {
    EMAIL_REGEXP: re,
    PASSWORD_REGEXP: decimal,
    PHONE_REGEXP: phone,
}