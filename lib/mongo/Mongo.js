var MongoDao = require('./MongoDao');
var MongoDB = require('./MongoDB');

function Mongo(config) {
    
    this.db = null;
    
    this.getDB = async function() {
        if (!this.db) {
            this.db = new MongoDB();
            this.db.debug = false;
            await this.db.connect(config.dburl,null,config.dbname);
        }
        return this.db;
    }

    this.getDao = async function(table) {
        await this.getDB();
        var dao = new MongoDao(this.db, table);
        return dao;
    }
}

module.exports = Mongo;
