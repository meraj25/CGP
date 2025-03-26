import mongoose from "mongoose";
import UserSchema from "lib/db/schemas/userSchema";

const user = mongoose.models.user || mongoose.model('user', UserSchema);

export default user;


