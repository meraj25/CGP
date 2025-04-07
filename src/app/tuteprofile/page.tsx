"use client";

import React, { useState, useRef } from "react";
import { uploadTutorMaterial } from "lib/action/authm";

export default function MaterialUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [type, setType] = useState<string>("Tutes");
    const [session, setSession] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const profileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.ms-powerpoint",
                "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            ];
            const maxSize = 100 * 1024 * 1024; // 100MB

            if (!allowedTypes.includes(selectedFile.type)) {
                alert("Invalid file type");
                return;
            }

            if (selectedFile.size > maxSize) {
                alert("File size exceeds 100MB limit");
                return;
            }

            setFile(selectedFile);
        }
    };

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(selectedFile.type)) {
                alert("Invalid image type. Please use JPG, PNG or GIF.");
                return;
            }

            if (selectedFile.size > maxSize) {
                alert("Image size exceeds 5MB limit");
                return;
            }

            // Create a preview URL for the selected profile image
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePic(e.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const triggerProfilePicUpload = () => {
        profileInputRef.current?.click();
    };

    const handleUpload = async () => {
        if (!file || !type || !session || !description) {
            alert("Please fill in all fields before uploading.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", type);
            formData.append("session", session);
            formData.append("description", description);

            const result = await uploadTutorMaterial(formData, "currentUserId");

            if (result.success) {
                alert("Material uploaded successfully!");
                setFile(null);
                setType("Tutes");
                setSession("");
                setDescription("");
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("An error occurred during upload.");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Top Navigation */}
            <div className="bg-green-500 text-white p-3 flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <span>Home</span>
                    <span>About</span>
                    <span>Contact Us</span>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-black mr-2"></div>
                        <span>Hi, User</span>
                    </div>
                    <span>Log Out</span>
                </div>
            </div>

            {/* Back Button */}
            <div className="p-4">
                <button className="text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* Main Content with Profile and Upload Form */}
            <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row">
                {/* Profile Section */}
                <div className="md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
                    <div className="relative w-32 h-32 bg-green-300 rounded-full flex justify-center items-center">
                        {profilePic ? (
                            <img 
                                src={profilePic} 
                                alt="Profile" 
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-16 w-16" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                                />
                            </svg>
                        )}
                        <button 
                            onClick={triggerProfilePicUpload}
                            className="absolute bottom-0 right-0 bg-white p-1 rounded-full border-2 border-green-500"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                                />
                            </svg>
                        </button>
                        <input 
                            type="file"
                            ref={profileInputRef}
                            onChange={handleProfilePicChange}
                            accept=".jpg,.jpeg,.png,.gif"
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Upload Form Section */}
                <div className="md:w-3/4">
                    <div className="mb-4 flex justify-between items-center">
                        <div className="w-1/3">
                            <label className="font-medium">Type</label>
                        </div>
                        <div className="w-2/3">
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="Tutes">Tutes</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="mb-4 flex justify-between items-center">
                        <div className="w-1/3">
                            <label className="font-medium">Session</label>
                        </div>
                        <div className="w-2/3">
                            <select
                                value={session}
                                onChange={(e) => setSession(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="">Session</option>
                                <option value="Session1">Session 1</option>
                                <option value="Session2">Session 2</option>
                                <option value="Session3">Session 3</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex justify-center mt-4 mb-8">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-green-400 text-white py-2 px-8 rounded-full hover:bg-green-500 transition-colors"
                        >
                            Upload
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.pptx"
                            className="hidden"
                        />
                    </div>

                    {file && (
                        <div className="mb-4">
                            <p className="text-sm">
                                Selected File: <span className="font-medium">{file.name}</span>
                            </p>
                        </div>
                    )}

                    {/* Description Field */}
                    <div className="mb-4">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description for the material"
                            className="w-full p-3 border rounded-md h-32"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleUpload}
                            className="bg-green-400 text-white py-2 px-8 rounded-md hover:bg-green-500 transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-green-500 p-12 mt-8"></div>
        </div>
    );
}