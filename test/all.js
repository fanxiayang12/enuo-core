var MysqlDao = require('../lib/mysql/MysqlDao');
var MysqlDB = require('../lib/mysql/MysqlDB');

var db = new MysqlDB();
db.debug = true;
db.connect({
    connectionLimit: 10,
    host: '10.10.10.14',
    user: 'root',
    password: 'root',
    database: 'emdata_emr_prod_619'
});

var dao = new MysqlDao(db,'ip_patient_hospital_rel');

dao.exists('patient_id = ?',['648aefd369ee11e7b6197cd30ac34196']);