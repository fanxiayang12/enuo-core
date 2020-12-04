/**
 * Created by zhanxiaoping 
 * zhanxp@me.com
 */
function MysqlDao(db, table) {
    this.table = table;
    this.db = db;
    this.insert = async function (data) {
        return await db.insert(this.table, data);
    };
    this.insertBatch = async function (datas, delayed) {
        return await db.insertBatch(this.table, datas, delayed);
    };

    this.update = async function (data) {
        return await db.update(this.table, data);
    };
    this.updateById = async function (data, id) {
        data.id = id;
        return await this.update(data);
    };
    this.updateBatch = async function (data, conditions) {
        return await db.updateBatch(this.table, data, conditions);
    };

    this.findById = async function (id) {
        return await db.loadById(this.table, id);
    };

    this.findByKV = async function (key, value) {
        return await db.loadByKV(this.table, key, value);
    };

    this.deleteById = async function (id) {
        return await this.deleteByKV("id", id);
    };

    this.deleteByKV = async function (key, value) {
        var where = key + "=?"
        var params = [value];
        return await this.delete(where, params);
    };

    this.delete = async function (where, params) {
        var conditions = {};
        conditions.where = where;
        conditions.params = params;

        return await db.delete(this.table, conditions);
    };

    this.count = async function (where, params) {
        var conditions = {
            where: where,
            params: params
        };
        return await db.count(this.table, conditions);
    };

    this.exists = async function (where, params) {
        var conditions = {
            where: where,
            params: params
        };
        return await db.exists(this.table, conditions);
    };

    this.find = async function (where, params) {
        var conditions = {};
        conditions.where = where;
        conditions.params = params;
        return await db.load(this.table, conditions);
    };

    this.list = async function (where, params, options) {
        options = options || {};
        var conditions = {};
        conditions.where = where;
        conditions.params = params;
        conditions.orderBy = options.orderBy;
        conditions.limit = options.limit;
        conditions.cols = options.cols;
        return await db.list(this.table, conditions);
    };

    this.pageList = async function (pageIndex, pageSize, where, params, orderBy, cols) {
        var conditions = {};
        conditions.where = where;
        conditions.params = params;
        conditions.limit = pageSize;
        conditions.skip = pageSize * (pageIndex - 1);
        conditions.orderBy = orderBy;
        conditions.cols = cols;
        var items = await db.list(this.table, conditions);
        var total = await db.count(this.table, conditions);
        return {
            items: items,
            total: total,
            pageIndex: pageIndex,
            pageSize: pageSize
        };
    };
    this.pageListMoreTable = async function (conditions, pageIndex, pageSize) {
        conditions = conditions || {};
        // conditions.where = where;
        // conditions.params = params;
        conditions.limit = pageSize;
        // conditions.orderBy = orderBy;
        conditions.skip = pageSize * (pageIndex - 1);
        console.log(conditions.table);
        var items = await db.listMoreTable(conditions);
        var total = await db.countMoreTable(conditions);
        return {
            items: items,
            total: total,
            pageIndex: pageIndex,
            pageSize: pageSize
        };
    };

}

module.exports = MysqlDao;