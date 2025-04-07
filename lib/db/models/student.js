import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    dob:{type: Date , required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
}, { timestamps: true });
export default mongoose.models.Student || mongoose.model("Student", studentSchema);








