"use server"

import {dbConnect} from "lib/db/models/mongodb"
import bcrypt from "bcryptjs";
import user from "../db/models/user";  // Adjust path based on actual location

export async function signup(formData) {
    try {
        await dbConnect();
        const user_name = formData.username;
        const email = formData.email;
        const password = formData.password;
        const dob = formData.dob;
        console.log(email, password, user_name, dob);
        
        // Validate inputs
        if (!email || !password || !user_name || !dob) {
            throw new Error("Missing required fields");
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ user_name, email, password: hashedPassword, dob });
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