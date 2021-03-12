const redis = require('redis')

const redisService = {
    init(){
       this.connect();
    },
    connect(){
        this.client = redis.createClient();
        this.client.on("connect", (_) => console.log('REDIS connected'));
        this.client.on("error", (error) => console.error(error));
    },
    getter (key)  {
        return new Promise((resolve, reject) => {
            redisService.client.get(key, (err, data) => {
                console.log('`key => ', key)
                console.log('`data => ', data)
                if (err) {
                    reject(false)
                }
                resolve(data ? JSON.parse(data) : null)
            });
        })
    },

    async deleter (key)  {
        const deleteToken = await this.client.del(key)
        return deleteToken
    },

    async setter (key, value) {
        const data =  await  redisService.client.set(key, JSON.stringify(value), redis.print);
        console.log('DATA => ', data)
    }

}
module.exports = redisService;
