const NodeCache = require("node-cache");

function Cache() {
    this.myCache = new NodeCache();
    this.get = function(key) {
        return this.myCache.get(key);
    }
    this.set = function(key, obj, time) {
        time = time || 0;
        return this.myCache.set(key, obj, time)
    }
    this.del = function(key) {
        return this.myCache.del(key);
    }
}

module.exports = Cache;