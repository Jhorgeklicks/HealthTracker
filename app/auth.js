import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { Staff } from "./lib/models";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    connectToDB();
    console.log(credentials.name);
    const user = await Staff.findOne({ name: credentials.name });

    if (!user) throw new Error("Facility Not available!");

    // Update this later to make only Admins and Editors to login.
    // if (!user || !user.isAdmin) throw new Error("Email Not available!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Facility Name or Password Invalid!");
    console.log(user)
    return user;
  } catch (err) {
    // console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.location = user.location;
        token.isAdmin = user.isAdmin;
        token.id = user.id;
        // token.img = user.img;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.location = token.location;
        session.user.isAdmin = token.isAdmin;
        // session.user.img = token.img;
      }
      return session;
    },
  },
});
