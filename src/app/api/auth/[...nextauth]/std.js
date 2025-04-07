import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "../../../../../models/mongodb";
import Student from "../../../../../lib/db/models/student"; 
import bcrypt from "bcryptjs";
import { type } from "os";   

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        std_id: { label: "Tut_id", type: "text", required: true },
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        await dbConnect();
        const student = await Student.findOne({ email: credentials.email, std_id: credentials.std_id });
        if (!student) throw new Error("User not found");
                
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");
         
        return { std_id: user.std_id, name: user.name, email: user.email };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login.std" },
});