import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/dbConfig";
import User from "@models/user";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const userSession = await User.findOne({ email: session?.user.email });
      session.user.id = userSession?._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            username: profile.name.replace(" ", "").toLowerCase(),
            email: profile.email,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
