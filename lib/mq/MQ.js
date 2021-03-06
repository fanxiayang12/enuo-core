var amqp = require('amqplib/callback_api');
var logger = require("../logger");
var util = require("util");

function MQ(url) {
    this.url = url;
    this.connection = null;
    this.channel_pub = null;
    this.channel_con = null;
    this.connect = async function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            amqp.connect(_this.url, function (err, conn) {
                if (err) {
                    logger.error(err);
                    return reject(err);
                }
                _this.connection = conn;
                return resolve();
            });
        });
    }

    this.channel = async function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.createChannel(function (err, ch) {
                if (err) {
                    return reject(err);
                }
                return resolve(ch);
            });
        });
    }

    this.publish = async function (name, json) {
        if (!this.channel_pub) {
            this.channel_pub = await this.channel();
        }
        var ch = this.channel_pub;
        //this.connection.createChannel(on_open);

        // function on_open(err, ch) {
        //     if (err != null) {
        //         logger.error(err);
        //         return;
        //     }

        ch.assertQueue(name, { durable: true });
        //var str = util.isString(body) ? body : JSON.stringify(body);
        ch.sendToQueue(name, new Buffer(JSON.stringify(json)));
        // }
    }

    this.get = async function (name, callback) {
        if (!this.channel_con) {
            this.channel_con = await this.channel();
        }
        var ch = this.channel_con;

        var _this = this;
        ch.assertQueue(name, { durable: true });
        ch.get(name, {}, async function (err, msg) {
            if (err || !msg) {
                // setTimeout(() => {
                //     _this.get(name, callback);
                // }, 1000);
                return;
            } else {
                try {
                    var str = msg.content.toString();
                    var obj = JSON.parse(str);
                    callback(obj).then(function () {
                        ch.ack(msg);
                    }, function (error) {
                        logger.error(error);
                        ch.ack(msg);
                    });
                } catch (e) {
                    logger.error(e);
                    ch.ack(msg);
                }
            }
        });
    }

    this.consumer = async function (name, callback, prefetch) {
        prefetch = prefetch || 1;
        if (!this.channel_con) {
            this.channel_con = await this.channel();
        }
        this.channel_con.prefetch(prefetch);

        var ch = this.channel_con;
        //var ok = this.connection.createChannel(on_open);

        // function on_open(err, ch) {
        //     if (err != null) {
        //         logger.error(err);
        //         return;
        //     }

        ch.assertQueue(name, { durable: true });
        ch.consume(name, async function (msg) {
            if (!msg) {
                return;
            }

            try {
                var str = msg.content.toString();
                var obj = JSON.parse(str);
                callback(obj).then(function () {
                    ch.ack(msg);
                }, function (error) {
                    logger.error(error);
                    ch.ack(msg);
                });
            } catch (e) {
                logger.error(e);
                ch.ack(msg);
            }
        });
        // }
    }


    this.remove = async function (name) {
        this.connection.deleteQueue(name);
    }

    this.close = async function () {
        await this.connection.close();
    }
}

module.exports = MQ;