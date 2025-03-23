"use client";
import { signup } from "lib/action/auth"
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState<{
        username: string;
        email: string;
        nic: string;
        password: string;
        cv: File | null;
      }>({
        username: "",
        email: "",
        nic: "",
        password: "",
        cv: null
      });
    
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value
        }));
      };
      
  
     

      const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setFormData({
            ...formData,
            cv: e.target.files[0]
          });
        }
      };
      
  
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
      try {
        // Create a FormData object for file upload
        const submitData = new FormData();
        submitData.append("username", formData.username);
        submitData.append("email", formData.email);
        submitData.append("nic", formData.nic);
        submitData.append("password", formData.password);
        if (formData.cv) {
          submitData.append("cv", formData.cv);
        }
  
        const response = await fetch("/api/tutor/signup", {
          method: "POST",
          body: submitData
        });
  
        const data = await response.json();
        
        if (response.ok) {
          setMessage(data.message || "Registration successful!");
          // Redirect to login page after successful registration
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          setMessage(data.error || "Error signing up. Please try again.");
        }
      } catch (error) {
        setMessage("Server error. Please try again later.");
        console.error("Signup error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-4">
        <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex text-center mb-4">
            <Link href="/signup">
              <div className="flex-1 py-3 bg-gray-200 text-gray-700">STUDENTS</div>
            </Link>
            <div className="flex-1 py-3 bg-green-500 text-white font-medium">
              TUTOR
            </div>
          </div>
  
          <div className="px-8 py-6">
            <h2 className="text-2xl text-green-700 italic text-center mb-8">
              Join with us as a Tutor....
            </h2>
  
            {message && (
              <div className={`mb-4 p-2 text-center rounded ${message.includes('error') || message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message}
              </div>
            )}
  
            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <div className="flex items-center">
                  <div className="absolute left-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
  
              <div className="mb-4 relative">
                <div className="flex items-center">
                  <div className="absolute left-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
  
              <div className="mb-4 relative">
                <div className="flex items-center">
                  <div className="absolute left-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    placeholder="NIC Number"
                    required
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
  
              <div className="mb-6 relative">
                <div className="flex items-center">
                  <div className="absolute left-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <div 
                    className="absolute right-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
  
              <div className="mb-6">
                <label className="block text-sm mb-2">Upload your CV here*</label>
                <div className="flex">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="cv-upload"
                    required
                  />
                  <label 
                    htmlFor="cv-upload" 
                    className="flex-grow py-2 border border-gray-300 rounded-l text-gray-700 bg-gray-50 px-3 truncate"
                  >
                  {formData.cv?.name || "Choose file..."}
                  </label>
                  <label
                    htmlFor="cv-upload"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r flex items-center justify-center cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Upload
                  </label>
                </div>
              </div>
  
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded transition duration-300 uppercase disabled:opacity-70"
              >
                {loading ? "Processing..." : "REGISTER"}
              </button>
            </form>
  
            <div className="mt-6 text-center text-sm">
              Already have an Account?{" "}
              <Link href="/login">
                <span className="text-green-600 hover:text-green-800 font-medium cursor-pointer">
                  Login
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
