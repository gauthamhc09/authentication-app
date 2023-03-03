import { MongoClient } from "mongodb";

const clientAddress = MongoClient.connect('mongodb+srv://auth-user:ffQTKDf4XIiHyozj@cluster0.qbr95jh.mongodb.net/?retryWrites=true&w=majority')

export async function ConnectDatabase() {
    const client = await clientAddress;
    return client;
}
