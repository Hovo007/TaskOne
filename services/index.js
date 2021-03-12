const db = require('./dbService');
const redis = require('./redisService');

module.exports = {
    init(){
        db.init();
        redis.init()
    }
}