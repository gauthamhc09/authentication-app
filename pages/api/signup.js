import { hashPassword } from "@/helpers/auth";
import { ConnectDatabase } from "@/helpers/db";

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        console.log('email--', email);
        // if (!email || !email.trim() === '' || !password || !password.length < 7) {
        //     res.status(422).json({ message: 'Invalid Input' });
        //     return;
        // }

        const hashedpassword = await hashPassword(password);

        const db = await ConnectDatabase();

        const result = await db.collection('users').insertOne({
            email: email,
            password: hashedpassword
        })

        res.status(201).json({ message: 'Sign up Successful' })

        // if (res.status(422).json({ message: 'Connecting to database failed!!' }))
        // if (res.status(422).json({ message: 'Failed to add the user to the database!!' }))
    }
}

export default handler;