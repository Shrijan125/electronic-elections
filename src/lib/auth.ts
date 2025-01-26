import { connectToDB } from '@/db';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(
        credentials: { email: string; password: string } | undefined,
      ) {
        if (!credentials) return null;
        try {
            if(credentials.email === 'admin1' && credentials.password === '12345678')
            {
                return {id: 'admin1', email: 'admin1', name: 'admin1'};
            }
            return  null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};
