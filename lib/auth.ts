import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';
import { users } from './schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await db.select().from(users).where(eq(users.username, credentials.username)).limit(1);
        if (!user[0]) return null;

        const isValid = await bcrypt.compare(credentials.password, user[0].password);
        if (!isValid) return null;

        return {
          id: user[0].id,
          username: user[0].username,
          role: user[0].role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.role = token.role as string;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
});

export async function isAdmin(userId?: string): Promise<boolean> {
  if (!userId) return false;

  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return user[0]?.role === 'admin';
}
