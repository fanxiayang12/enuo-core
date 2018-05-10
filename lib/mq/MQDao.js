var MQ = require('./MQ');

function MQDao(mqUrl,mqName) {
    this.mqName = mqName;
    this.mqUrl = mqUrl;
    this.mq = null;

    this.connect = async function () {
        if (!this.mq) {
            this.mq = new MQ(this.mqUrl);
            await this.mq.connect();
        }
    }

    this.publish = async function (data) {
        await this.connect();
        await this.mq.publish(mqName, data);
    }

    this.consumer = async function (callback) {
        var _this = this;
        await this.connect();
        await this.mq.consumer(mqName,callback);
    }
}

module.exports = MQDao;