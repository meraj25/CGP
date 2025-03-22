"use server"

import { dbConnect } from "../db/mongodb";
import bcrypt from "bcryptjs";

import User from "../db/models/user";

export async function signup(formData) {
    try {
        await dbConnect();
        
        const email = formData.email;
        const password = formData.password;
        const user_name = formData.username;
        console.log(email, password, user_name);
        // Validate inputs
        if (!email || !password || !user_name) {
            throw new Error("Missing required fields");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ user_name, email, password: hashedPassword });
        await newUser.save();
        
        return { success: true, message: "User registered successfully" };
    } catch (error) {
        console.error('Error signing up:', error);
        
        // Return structured error object
        return { 
            success: false, 
            error: error.message || "Server error",
            code: error.message === "User already exists" ? "USER_EXISTS" : "SERVER_ERROR"
        };
    }
}
