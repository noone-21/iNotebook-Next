import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase, findOneFromDatabase } from '@/lib/db-util';
import { NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/auth';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {


        let client

        try {
    
            client = await connectToDatabase()
            
        } catch (error) {
            return NextResponse.json({ message: 'Connection to Db Failed!' }, { status: 500 })
        }
    
        const user = await findOneFromDatabase(client, 'users', credentials.email)
        //

        const isValid = await verifyPassword(
          credentials.password,
          user.password
          );

        if (isValid) {
          return {
            id: user.id,
            email: user.email,
            name: user.name
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };