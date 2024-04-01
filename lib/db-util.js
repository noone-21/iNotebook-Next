import { MongoClient } from 'mongodb';

const connectionString = `mongodb+srv://datechscale:hesoyam.14@cluster0.cmeuax1.mongodb.net/inotebook?retryWrites=true&w=majority&appName=cluster0`

export async function connectToDatabase() {
    return await MongoClient.connect(connectionString)

}

export const insertToDatabase = async (client, document, collection) => {

    const db = client.db()
    return await db.collection(collection).insertOne(document)
}


export const findAllFromDatabase = async (client, collection) => {

    const db = client.db()
    return await db.collection(collection).find().sort({ _id: -1 }).toArray()


}
export const updateInDatabase = async (client, collection, id, newNote) => {

    const db = client.db()
    return await db.collection(collection).findOneAndUpdate({ _id: id }, { $set: { title: newNote.title, description: newNote.description, tag: newNote.tag } }, { new: true })


}
export const findOneFromDatabase = async (client, collection, email) => {

    const db = client.db();
    return await db.collection(collection).findOne({ email });
}

export const deleteInDatabase = async (client, collection, noteId) => {
    const db = client.db()
    return await db.collection(collection).deleteOne({ _id: noteId })
}