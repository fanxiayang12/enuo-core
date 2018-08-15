const Mysql = require('../lib/mysql/Mysql');

async function run(params) {
    var emdata = new Mysql({
        connectionLimit: 10,
        port: 3306,
        host: '10.10.10.13',
        user: 'root',
        password: 'root',
        database: 'emdata'
    });
    var wechat_patient_account = emdata.getDao('wechat_patient_account');
    var accouts = await wechat_patient_account.list('appid = ?', ['wx674504bb2570e1ec']);
    
    console.log(accouts);
}

run();