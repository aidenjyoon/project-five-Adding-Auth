import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import connectToDatabase from "../../../helpers/db";
import { verifyPassword } from "../../../helpers/auth";

// https://next-auth.js.org/configuration/initialization
export default NextAuth({
  // https://next-auth.js.org/configuration/options

  session: {
    // json web token
    jwt: true,
  },

  providers: [
    // https://next-auth.js.org/providers/
    Providers.Credentials({
      // this will let next-auth generate login form for me.
      // don't need since I already built one.
      // credentials: {
      //     email, password
      // }

      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.emails,
        });

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log you in!");
        }

        client.close();

        return { email: user.email };
      },
    }),
  ],
});
