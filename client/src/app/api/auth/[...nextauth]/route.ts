import { axiosNoAuth } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";




async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await axiosNoAuth.post("/auth/refresh", null, {
      headers: {
        authorization: `Refresh ${token.backendTokens.refreshToken}`,
      },
    });
    return {
      ...token,
      backendTokens: res.data,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email",type: "email", placeholder: "email"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const res = await axiosNoAuth.post("/auth/login", credentials);
          if (res.status === 401) {
            console.log(res.statusText);
            return null;
          }
          return res.data;
        } catch (error) {
          console.error("Error logging in:", error);
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.backendTokens.expiresIn)
        return token;
      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },

  pages: {
    signIn :"/auth/login"
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };