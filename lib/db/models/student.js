import mongoose from "mongoose";
import StudentSchema from "lib/db/schemas/studentSchema";

const student = mongoose.models.student || mongoose.model('student', StudentSchema);

export default studenttudent;