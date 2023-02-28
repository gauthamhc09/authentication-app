import { verifyPassword } from '@/helpers/auth';
import { ConnectDatabase } from '@/helpers/db';
import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
// import { SessionProvider } from "next-auth/react";
// import Providers from 'next-auth/react';
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const client = await ConnectDatabase();

                const userCollections = client.collection('users');

                const user = await userCollections.findOne({ email: credentials.email });

                if (!user) {
                    client.close();
                    throw new Error('No user found')
                }

                const isValid = await verifyPassword(credentials.password, user.password)


                if (!isValid) {
                    // client.close();
                    throw new Error('Invalid password')
                }

                // client.close();
                return user.email;

            }
        })
    ]
})