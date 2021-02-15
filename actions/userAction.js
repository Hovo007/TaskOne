const knex = require('../services/knex')


const createUser = async (body) => {
    const inserted = await knex.raw(`INSERT INTO users (name, surname, email, password, phone)
         VALUES ("${body.name}","${body.surname}","${body.email}","${body.password}","${body.phone}")`);
    console.log(inserted[0]);
    return inserted;
}

const getUser = async ({email, phone}) => {
    const user = await knex.raw( `SELECT * FROM users WHERE email = '${email}' and phone = '${phone}'  LIMIT 1` )

    return user[0] && user[0][0] || null;
}


module.exports = {
    createUser,
    getUser,
}