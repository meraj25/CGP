"use client"; // For Next.js 13+ App Router

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [std_id, setstd_id] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('student');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const validate = async () => {
    let newErrors: { Tut_id?: string; password?: string; general?: string  } = {};
    
    // Add validation logic here if needed
    // For example:
    // if (!Tut_id) newErrors.Tut_id = "Tutor ID is required";
    // if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        std_id,
        password,
      });

      console.log("SignIn Result:", result);
      if (!result || !result.ok) {
        setErrors({ general: "Invalid credentials" });
        return false;
      }
      return true;
    } catch (error) {
      console.error("Sign in error:", error);
      setErrors({ general: "Authentication failed" });
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await validate()) {
      setIsSubmitting(true);
      localStorage.setItem("User", JSON.stringify({ email, std_id }));
      router.push("/dashboard"); // Redirect to dashboard
    }
  };
  
  return (
    <div className="flex min-h-screen bg-green-200/70">
      {/* Left side with illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
        <div className="relative">
          {/* Chalkboard */}
          <div className="w-72 h-64 bg-green-700 border-8 border-amber-800 relative">
            {/* Stars on chalkboard */}
            <div className="text-white text-2xl absolute top-4 left-8">★</div>
            <div className="text-white text-xl absolute top-12 left-16">★</div>
            <div className="text-white text-2xl absolute top-6 left-24">★</div>
            <div className="text-white text-xl absolute top-16 left-32">★</div>
            <div className="text-white text-2xl absolute top-8 left-40">★</div>
          </div>
          
          {/* Desk */}
          <div className="w-80 h-24 bg-amber-700 mt-4"></div>
          
          {/* Books */}
          <div className="absolute top-64 left-4 w-12 h-8 bg-red-600"></div>
          <div className="absolute top-60 left-4 w-12 h-4 bg-blue-600"></div>
          
          {/* Teacher character */}
          <div className="absolute bottom-0 right-0">
            {/* Hair bun */}
            <div className="w-12 h-12 bg-orange-400 rounded-full absolute -top-64 right-20"></div>
            
            {/* Face */}
            <div className="w-16 h-16 bg-amber-200 rounded-full absolute -top-60 right-18"></div>
            
            {/* Eyes */}
            <div className="w-3 h-3 bg-blue-600 rounded-full absolute -top-58 right-26"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full absolute -top-58 right-20"></div>
            
            {/* Smile */}
            <div className="w-6 h-3 border-b-2 border-black absolute -top-54 right-22"></div>
            
            {/* Body/clothes */}
            <div className="w-24 h-48 absolute -top-48 right-16">
              {/* Jacket */}
              <div className="w-24 h-24 bg-purple-800 absolute top-0"></div>
              {/* Skirt */}
              <div className="w-24 h-24 bg-purple-400 absolute top-24"></div>
              {/* Legs */}
              <div className="w-6 h-24 bg-amber-200 absolute top-48 left-4"></div>
              <div className="w-6 h-24 bg-amber-200 absolute top-48 right-4"></div>
              {/* Shoes */}
              <div className="w-8 h-4 bg-amber-900 absolute top-72 left-3"></div>
              <div className="w-8 h-4 bg-amber-900 absolute top-72 right-3"></div>
            </div>
            
            {/* Pointer stick */}
            <div className="w-1 h-20 bg-black absolute -top-40 right-32 rotate-45"></div>
          </div>
        </div>
      </div>
      
      {/* Right side with login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          {/* Tabs */}
          <div className="flex mb-6 border-b">
            <button 
              className={`px-4 py-2 w-1/2 text-center ${activeTab === 'students' ? 'bg-green-100 rounded-t-lg' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              STUDENTS
            </button>
            <button 
              className={`px-4 py-2 w-1/2 text-center ${activeTab === 'tutor' ? 'bg-green-500 text-white rounded-t-lg' : ''}`}
              onClick={() => setActiveTab('tutor')}
            >
              TUTOR
            </button>
          </div>
          
          {/* Login form */}
          <form onSubmit={handleLogin} className="mb-8">
            <h2 className="text-2xl font-serif text-center text-green-800 mb-8">Login to your Account</h2>
            
            {errors.general && (
              <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                {errors.general}
              </div>
            )}
            
            <div className="mb-4">
              <label className="block mb-2">Tutor ID</label>
              <input 
                type="text" 
                value={std_id}
                onChange={(e) => setstd_id(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder=""
              />
              {errors.Tut_id && <p className="text-red-500 text-sm mt-1">{errors.Tut_id}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder=""
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder=""
                />
                <button 
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-gray-600">Forgot Password?</a>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md mt-4"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
          
          <div className="text-center">
            <p>Don't have an Account? <a href="#" className="text-green-700 font-medium">Register now</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}