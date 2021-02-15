const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Kosyan007',
        database: 'taskOne'
    }
})

module.exports = knex

