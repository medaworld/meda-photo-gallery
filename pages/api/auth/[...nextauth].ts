import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../helpers/mongodb/auth';
import { connectToDatabase } from '../../../helpers/mongodb/db';

export const authOptions: NextAuthOptions = {
  session: {},
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const loginCollection = client.db().collection('login');
        const user = await loginCollection.findOne({
          email: credentials?.email,
        });

        if (!user) {
          throw new Error('No user found!');
        }
        const isValid = await verifyPassword(
          credentials!.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log in');
        }

        client.close();
        return { email: user.email } as any;
      },
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
    }),
  ],
};

export default NextAuth(authOptions);
