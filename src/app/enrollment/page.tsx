import React, { useState, useEffect } from 'react';
import {createEnrollment} from "lib/action/authenroll"

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    session: '',
    venue: '',
    amount: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState(['Morning', 'Afternoon', 'Evening', 'Weekend']);

  // Instead of using react-router, we'll get tutor info from props or context
  // For demo purposes, we'll use a mock tutor or you can pass it as a prop
  const tutorName = window.tutorInfo?.tutorName ;
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tutorName,
        
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create enrollment');
      }

      // Redirect to dashboard or show success message
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-green-500 p-3">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-white">Home</a>
            <a href="/about" className="text-white">About</a>
            <a href="/contact" className="text-white">Contact Us</a>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <span>Hi, User</span>
            <a href="/logout" className="text-white">Log Out</a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 max-w-md mx-auto w-full">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">Enroll Now</h1>
          
          {/* Tutor info display */}
          <div className="mb-4 w-full">
            <div className="bg-gray-100 p-3 rounded-md flex items-center justify-between">
              <p className="font-medium">Tutor: {tutorName}</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <label htmlFor="session" className="block text-sm mb-1">Session</label>
              <select
                id="session"
                name="session"
                value={formData.session}
                onChange={handleChange}
                required
                className="w-full border rounded p-2 appearance-none"
              >
                <option value="" disabled>Select Session</option>
                {sessions.map((session) => (
                  <option key={session} value={session}>{session}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            
            <div>
              <label htmlFor="venue" className="block text-sm mb-1">Venue</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm mb-1">Amount</label>
              <div className="flex items-center">
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border rounded-l p-2"
                />
                <span className="bg-gray-100 border border-l-0 rounded-r p-2 text-gray-500">LKR</span>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-200"
            >
              {isLoading ? 'Processing...' : 'Enroll'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-500 p-6 mt-auto">
        <div className="max-w-6xl mx-auto">
          {/* Footer content can be added here */}
        </div>
      </footer>
    </div>
  );
};

export default EnrollmentForm;