const redis = require('redis')
const client = redis.createClient();

client.on("error", (error) => console.error(error));


const setRedis = async (key, value) => {
    return await client.set(key, value, redis.print);
}

const getRedis = (key) => {
    return new Promise(resolve => {
        client.get(key, (err, data) => {
            resolve(data ? JSON.parse(data) : null)
        });
    })
}

const deleteUser = async (key) => {
    const deleteToken = await client.del(key)
    return deleteToken
}

module.exports = {
    setRedis,
    getRedis,
    deleteUser
}