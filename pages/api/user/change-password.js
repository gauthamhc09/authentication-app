import { hashPassword, verifyPassword } from "@/helpers/auth";
import { ConnectDatabase } from "@/helpers/db";
import { getSession } from "next-auth/react";

async function handler(req, res) {
    if (req.method !== 'PATCH') {
        return;
    }

    const session = await getSession({ req: req })

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await ConnectDatabase();
    const db = client.db('auth-demo');
    const usersCollection = db.collection('users')
    const existingUser = await usersCollection.findOne({ email: userEmail });

    if (!existingUser) {
        res.status(404).json({ message: 'User not found' });
        client.close();
        return;
    }

    const currentPassword = existingUser.password;

    const oldPasswordMatch = await verifyPassword(oldPassword, currentPassword);

    if (!oldPasswordMatch) {
        res.status(403).json({ message: 'User not authenticated' })
        // client.close();
        return;
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } });


    client.close();
    res.status(200).json({ message: 'Password updated successfully' })
}

export default handler