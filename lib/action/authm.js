"use server"

import { dbConnect } from "lib/db/models/mongodb";
import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';
import path from 'path';




const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `${Date.now()}-${file.originalname}`;
            const fileInfo = {
                filename: filename,
                bucketName: 'tutormaterials',
                metadata: {
                    userId: req.user.id,
                    type: req.body.type,
                    session: req.body.session
                }
            };
            resolve(fileInfo);
        });
    }
});

// Configure multer upload
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|mp4|ppt|pptx/;
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedFileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only documents, images, and presentations are allowed.'));
        }
    },
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB file size limit
    }
});

export  async function uploadTutorMaterial(req, userId) {
    try {
        // Ensure database connection
        await dbConnect();

        // Validate input
        if (!req.body.type || !req.body.session) {
            return {
                success: false,
                error: 'Type and Session are required',
                code: 'MISSING_FIELDS'
            };
        }

        // Promisify multer upload
        return new Promise((resolve, reject) => {
            upload.single('file')(req, null, async (err) => {
                if (err) {
                    return reject({
                        success: false,
                        error: err.message,
                        code: 'UPLOAD_ERROR'
                    });
                }

                // File upload successful
                if (!req.file) {
                    return reject({
                        success: false,
                        error: 'No file uploaded',
                        code: 'NO_FILE'
                    });
                }

                try {
                    // Create material record
                    const materialRecord = new Material({
                        userId: userId,
                        type: req.body.type,
                        session: req.body.session,
                        fileId: req.file.id,
                        filename: req.file.filename,
                        originalName: req.file.originalname,
                        mimetype: req.file.mimetype
                    });

                    await materialRecord.save();

                    resolve({
                        success: true,
                        message: 'Material uploaded successfully',
                        material: {
                            id: materialRecord._id,
                            type: materialRecord.type,
                            session: materialRecord.session,
                            filename: materialRecord.originalName
                        }
                    });
                } catch (saveError) {
                    console.error('Error saving material record:', saveError);
                    reject({
                        success: false,
                        error: 'Error saving material details',
                        code: 'SAVE_ERROR'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Tutor material upload error:', error);
        return {
            success: false,
            error: error.message || 'Server error during material upload',
            code: 'SERVER_ERROR'
        };
    }
}

// Utility function to retrieve uploaded materials
export async function getTutorMaterials(userId, filters = {}) {
    try {
        await dbConnect();

        // Find materials for the user with optional filtering
        const materials = await Material.find({
            userId: userId,
            ...filters
        }).sort({ uploadedAt: -1 });

        return {
            success: true,
            materials: materials.map(material => ({
                id: material._id,
                type: material.type,
                session: material.session,
                filename: material.originalName,
                uploadedAt: material.uploadedAt
            }))
        };
    } catch (error) {
        console.error('Error retrieving tutor materials:', error);
        return {
            success: false,
            error: 'Server error retrieving materials',
            code: 'SERVER_ERROR'
        };
    }
}

// Function to download or stream a specific material
export async function downloadTutorMaterial(materialId, userId) {
    try {
        await dbConnect();
        const conn = mongoose.connection;
        const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'tutormaterials'
        });

        // Verify material exists and belongs to user
        const material = await Material.findOne({ 
            _id: materialId, 
            userId: userId 
        });

        if (!material) {
            return {
                success: false,
                error: 'Material not found or access denied',
                code: 'NOT_FOUND'
            };
        }

        // Find the file in GridFS
        const files = await gfs.find({ _id: material.fileId }).toArray();
        
        if (!files || files.length === 0) {
            return {
                success: false,
                error: 'File not found',
                code: 'FILE_NOT_FOUND'
            };
        }

        return {
            success: true,
            file: {
                stream: gfs.openDownloadStream(material.fileId),
                filename: material.originalName,
                mimetype: material.mimetype
            }
        };
    } catch (error) {
        console.error('Error downloading material:', error);
        return {
            success: false,
            error: 'Server error downloading file',
            code: 'SERVER_ERROR'
        };
    }
}