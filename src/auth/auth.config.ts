import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginCredentialsSchema } from "@/schema/authSchema";
import { getUserByEmail } from "@/data/user";
import { compareSync } from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validationResult = loginCredentialsSchema.safeParse(credentials);
        if (validationResult.success) {
          const { email, password } = validationResult.data;
          const user = await getUserByEmail(email);
          if (!user?.password) return null;

          const passwordsMatch = compareSync(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
