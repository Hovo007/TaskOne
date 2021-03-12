const dbService = {
    init() {
        this.connect();
    },

    connect() {
       this.DB = require('knex')({
            client: 'mysql',
            connection: {
                host: '127.0.0.1',
                user: 'root',
                password: 'Kosyan007',
                database: 'taskOne'
            }
        })

        this.DB.raw('select 1+1 as result').then(_ => console.log('MYSQL connected'))
            .catch(e => console.log('MYSQL connection error'));
    },
    async doRequest(queryString) {
        const data = await this.DB.raw(queryString);
        return data;
    }
}

module.exports = dbService;