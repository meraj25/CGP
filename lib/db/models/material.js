import mongoose from "mongoose";
import { type } from "os";



const MaterialSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Tutes', 'Other'] 
    },
    session: {
        type: String,
        required: true
    },
    fileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    description:{
        type: String,
        required: true

    },
    picture: {
        fileId: {
            type: mongoose.Schema.Types.ObjectId
        },
        filename: {
            type: String
        },
        originalName: {
            type: String
        },
        mimetype: {
            type: String
        }
    }
});
export default mongoose.models.Material || mongoose.model("Material", MaterialSchema);

























