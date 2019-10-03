
const MongoClient = require('mongodb');
const url = "mongodb://localhost:27017/annuaire";
const dbName = "annuaire";


class Mongo {
    constructor() {
        if(!Mongo.instance) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
                (err, client) => {
                if (err) throw err;
                Mongo.instance = client.db(dbName);
                console.log('mongo connected');
                });
        }
    }
    getInstance(){
        return Mongo.instance;
    }
}

module.exports = new Mongo();