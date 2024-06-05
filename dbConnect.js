const {MongoClient} = require('mongodb')
const URL = "mongodb://localhost:27017"
const dbName = 'CoochingData'
const client = new MongoClient(URL)

async function dbConnect(collection)
{
    const result = await client.connect()
    db = result.db(dbName)
    return db.collection(collection);
}

module.exports = dbConnect