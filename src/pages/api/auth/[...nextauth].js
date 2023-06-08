import user from "models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import brcypt from "bcrypt";
import connectDB from "@lib/mongoose";
import clientPromise from "db/nextAuthUsers";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId:
        "502843698832-p95200vtpskm3ukp0fvvkc5hhajaecvo.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        connectDB();
        const { username, password } = credentials;
        console.log(username, password, "**** backend ****");
        const data = await user.findOne({ username: username });

        if (!data) {
          throw new Error("invalid username");
        }

        const matchPassword = await brcypt.compare(password, data.password);

        if (!matchPassword) {
          throw new Error("invalid password");
        }

        const sessionData = {
          id: data._id,
          email: data.email,
          name: data.username,

        };

        return sessionData;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, token, user }) {
      session.user.role = "user from callback";
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
});
