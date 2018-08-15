var MongoDB = require('./lib/mongo/MongoDB');
var MongoDao = require('./lib/mongo/MongoDao');
var Mongo = require('./lib/mongo/Mongo');
var MysqlDB = require('./lib/mysql/MysqlDB');
var MysqlDao = require('./lib/mysql/MysqlDao');
var Mysql = require('./lib/mysql/Mysql');
var api = require('./lib/apiResult');
var Redis = require('./lib/Redis');
var errors = require('./lib/errors');
var logger = require('./lib/logger');
var utils = require('./lib/utils');
var MQDao = require('./lib/mq/MQDao');

/**
 * Created by zhanxiaoping 
 * zhanxp@me.com
 */
var enuo = {
    mongo: new MongoDB(),
    mysql: new MysqlDB(),
    api: api,
    redis: new Redis(),
    errors: errors,
    logger: logger,
    utils: utils,
    Mongo: Mongo,
    MongoDB: MongoDB,
    Mysql: Mysql,
    MysqlDB: MysqlDB,
    Redis: Redis,
    MongoDao: MongoDao,
    MysqlDao: MysqlDao,
    MQDao: MQDao
};

module.exports = enuo;