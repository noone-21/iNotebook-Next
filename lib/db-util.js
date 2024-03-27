import { MongoClient } from 'mongodb';

const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.cmeuax1.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=${process.env.MONGODB_CLUSTERNAME}`

export async function connectToDatabase() {
    console.log(connectionString)
    return await MongoClient.connect(connectionString)

}

export const insertToDatabase = async (client, document, database) => {

    const db = client.db()
    return await db.collection(database).insertOne(document)
}


export const findAllFromDatabase = async (client, collection) => {

    const db = client.db()
    return await db.collection(collection).find().sort({ _id: -1 }).toArray()


}
export const findOneFromDatabase = async (client, collection,email) => {

    const db = client.db();

    return await db.collection(collection).findOne({ email: email });

}