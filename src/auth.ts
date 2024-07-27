import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import {PrismaAdapter} from '@auth/prisma-adapter';
import {db} from "@/db";

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

if(!client_id || !client_secret) throw new Error('Missing Github Auth Credentials');

export const {handlers: {GET, POST}, auth, signOut, signIn} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: client_id,
            clientSecret: client_secret
        })
    ],
    callbacks: {
        async session({session, user}: any) {
            if(session && user) {
                session.user.id = user.id;
            }
            return session;
        }
    }
})