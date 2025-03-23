import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "../../../../../models/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";
import { type } from "os";   

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        tut_id: { label: "Tut_id", type: "text", required: true },
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email, tut_id: credentials.tut_id });
        if (!user) throw new Error("User not found");
                
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");
         
        return { tut_id: user.tut_id, name: user.name, email: user.email };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login.tut" },
});