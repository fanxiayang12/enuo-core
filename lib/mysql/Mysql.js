var MysqlDao = require('./MysqlDao');
var MysqlDB = require('./MysqlDB');

function Mysql(config) {

    this.db = null;
    
    this.getDB = function() {
        if (!this.db) {
            this.db = new MysqlDB();
            this.db.debug = false;
            this.db.connect(config);
        }
        return this.db;
    }

    this.getDao = function(table) { // 同步
        this.getDB();
        var dao = new MysqlDao(this.db, table);
        return dao;
    }

    this.release = function() {
        if (this.db) {
            this.db.release();
        }
    }
}

module.exports = Mysql;
