import { MongoClient } from "mongodb";

export async function ConnectDatabase() {
    const client = await MongoClient.connect('mongodb+srv://auth-user:ffQTKDf4XIiHyozj@cluster0.qbr95jh.mongodb.net/?retryWrites=true&w=majority')
    const dataBase = client.db('auth-demo');
    return dataBase;
}