import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    nic:{type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
