import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '../../../backend/lib/mongodb';
import User from '../../../backend/models/User';
import { signToken } from '../../../backend/utils/auth';
import { serialize } from 'cookie';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                await dbConnect();

                // Check if user exists
                let existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    // Create new user
                    existingUser = await User.create({
                        name: user.name,
                        email: user.email,
                        password: 'google-oauth', // Placeholder, won't be used for OAuth users
                        role: 'user',
                    });
                }

                // Store user ID for use in jwt callback
                user.id = existingUser._id.toString();
                user.role = existingUser.role;

                return true;
            } catch (error) {
                console.error('Sign in error:', error);
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.JWT_SECRET,
});
