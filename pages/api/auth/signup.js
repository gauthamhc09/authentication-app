import { hashPassword } from "@/helpers/auth";
import { ConnectDatabase } from "@/helpers/db";

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // if (!email || !email.trim() === '' || !password || !password.length < 7) {
        //     res.status(422).json({ message: 'Invalid Input' });
        //     return;
        // }

        const client = await ConnectDatabase();        
        const db = client.db('auth-demo');
        const existingUser = await db.collection('users').findOne({ email: email });
        
        if (existingUser !== null) {
            res.status(422).json({ message: 'This user already found in the db' });
            client.close();
            return;
        }

        const hashedpassword = await hashPassword(password);
        const result = await db.collection('users').insertOne({
            email: email,
            password: hashedpassword
        })

        res.status(201).json({ message: 'Sign up Successful' })
        client.close();
        // if (res.status(422).json({ message: 'Connecting to database failed!!' }))
        // if (res.status(422).json({ message: 'Failed to add the user to the database!!' }))
    }
}

export default handler;