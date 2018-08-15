const Mongo = require('../lib/mongo/Mongo');

async function run(params) {
    var mongo = new Mongo({
        dburl: "mongodb://10.10.10.45:20000",
        dbname: "emdataBI"
    });
    
    var hf_import_data = await mongo.getDao('hf_import_data');
    var datas = await hf_import_data.list({
        "info_id": "5a16341a8925b47d110b562f"
    }, {
        limit: 100
    });

    console.log(datas);
}

run();