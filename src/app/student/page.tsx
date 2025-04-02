import React, { useState, useEffect } from 'react';
import enrollments from "src/app/api/auth/[...nextauth]/enrollments";

const StudentProfile = () => {
  // State for student data
  const [student, setStudent] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    studentId: "ST12345"
  });
  
  // State for enrollments
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filters
  const [selectedTutor, setSelectedTutor] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  
  // State for attendance
  const [attendance, setAttendance] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);

  // Fetch student enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/student/enrollments');
        // const data = await response.json();
        
        // Mock data for demonstration
        const data = [
          {
            _id: "1",
            tutorName: "Dr. Smith",
            session: "Mathematics Advanced",
            venue: "Main Campus Hall A",
            status: "active",
            enrolledAt: "2025-03-15",
            payment: {
              amount: 5000,
              currency: "LKR",
              status: "completed"
            },
            timeSlots: [
              { day: "Monday", startTime: "16:00", endTime: "18:00" },
              { day: "Wednesday", startTime: "16:00", endTime: "18:00" }
            ]
          },
          {
            _id: "2",
            tutorName: "Prof. Johnson",
            session: "Physics Fundamentals",
            venue: "Science Block Room 102",
            status: "active",
            enrolledAt: "2025-03-10",
            payment: {
              amount: 4500,
              currency: "LKR",
              status: "completed"
            },
            timeSlots: [
              { day: "Tuesday", startTime: "14:00", endTime: "16:00" },
              { day: "Friday", startTime: "14:00", endTime: "16:00" }
            ]
          },
          {
            _id: "3",
            tutorName: "Dr. Smith",
            session: "Mathematics Basics",
            venue: "Online",
            status: "active",
            enrolledAt: "2025-02-20",
            payment: {
              amount: 4000,
              currency: "LKR",
              status: "completed"
            },
            timeSlots: [
              { day: "Thursday", startTime: "18:00", endTime: "20:00" }
            ]
          }
        ];
        
        setEnrollments(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch enrollments");
        setLoading(false);
      }
    };
    
    fetchEnrollments();
  }, []);

  // Get unique tutors, sessions, and venues
  const tutors = [...new Set(enrollments.map(item => item.tutorName))];
  
  const sessions = selectedTutor 
    ? [...new Set(enrollments.filter(item => item.tutorName === selectedTutor).map(item => item.session))]
    : [];
    
  const venues = selectedSession
    ? [...new Set(enrollments
        .filter(item => item.tutorName === selectedTutor && item.session === selectedSession)
        .map(item => item.venue))]
    : [];

  // Filter enrollments based on selections
  const filteredEnrollments = enrollments.filter(enrollment => {
    if (selectedTutor && enrollment.tutorName !== selectedTutor) return false;
    if (selectedSession && enrollment.session !== selectedSession) return false;
    if (selectedVenue && enrollment.venue !== selectedVenue) return false;
    return true;
  });

  // Handle fetching attendance data
  const handleViewAttendance = () => {
    // In a real app, this would make an API call based on selectedTutor, selectedSession, selectedVenue
    // For this demo, we'll use mock data
    const mockAttendance = [
      { date: "2025-03-01", status: "present" },
      { date: "2025-03-04", status: "present" },
      { date: "2025-03-08", status: "absent" },
      { date: "2025-03-11", status: "present" },
      { date: "2025-03-15", status: "present" },
      { date: "2025-03-18", status: "absent" },
      { date: "2025-03-22", status: "present" },
    ];
    
    setAttendance(mockAttendance);
    setShowAttendance(true);
  };

  // Reset filters
  const handleReset = () => {
    setSelectedTutor('');
    setSelectedSession('');
    setSelectedVenue('');
    setShowAttendance(false);
  };

  // Handle tutor change - reset dependent filters
  const handleTutorChange = (tutor) => {
    setSelectedTutor(tutor);
    setSelectedSession('');
    setSelectedVenue('');
    setShowAttendance(false);
  };

  // Handle session change - reset venue
  const handleSessionChange = (session) => {
    setSelectedSession(session);
    setSelectedVenue('');
    setShowAttendance(false);
  };

  if (loading) return <div className="flex justify-center p-8">Loading student profile...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header - Keep as is */}
      <header className="bg-green-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="rounded-full bg-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="space-x-4">
              <a href="#" className="hover:underline">Home</a>
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Contact Us</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Hi, User</span>
            <a href="#" className="hover:underline">Log Out</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Info */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="bg-green-500 rounded-full w-24 h-24 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-4">{student.name}</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-semibold">Student ID:</span> {student.studentId}</p>
                <p><span className="font-semibold">Email:</span> {student.email}</p>
              </div>
            </div>
          </div>

          {/* Enrollment details */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">My Enrollments</h2>
              
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tutor</label>
                  <select 
                    className="w-full border rounded-md p-2"
                    value={selectedTutor}
                    onChange={(e) => handleTutorChange(e.target.value)}
                  >
                    <option value="">All Tutors</option>
                    {tutors.map(tutor => (
                      <option key={tutor} value={tutor}>{tutor}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
                  <select 
                    className="w-full border rounded-md p-2"
                    value={selectedSession}
                    onChange={(e) => handleSessionChange(e.target.value)}
                    disabled={!selectedTutor}
                  >
                    <option value="">Select Session</option>
                    {sessions.map(session => (
                      <option key={session} value={session}>{session}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                  <select 
                    className="w-full border rounded-md p-2"
                    value={selectedVenue}
                    onChange={(e) => setSelectedVenue(e.target.value)}
                    disabled={!selectedSession}
                  >
                    <option value="">Select Venue</option>
                    {venues.map(venue => (
                      <option key={venue} value={venue}>{venue}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-6 flex justify-between">
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
                  onClick={handleViewAttendance}
                  disabled={!selectedTutor || !selectedSession || !selectedVenue}
                >
                  View Attendance
                </button>
                
                <button 
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                  onClick={handleReset}
                >
                  Reset Filters
                </button>
              </div>

              {/* Attendance Section */}
              {showAttendance && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Attendance Record</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-3 gap-2">
                      {attendance.map((record, index) => (
                        <div 
                          key={index} 
                          className={`p-2 rounded-md text-center ${
                            record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <div className="text-sm">{new Date(record.date).toLocaleDateString()}</div>
                          <div className="font-medium">{record.status === 'present' ? 'Present' : 'Absent'}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm">
                      <span className="font-medium">Attendance Rate:</span> {' '}
                      {Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100)}%
                    </div>
                  </div>
                </div>
              )}
              
              {/* Enrollments Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Tutor</th>
                      <th className="py-2 px-4 border-b text-left">Session</th>
                      <th className="py-2 px-4 border-b text-left">Venue</th>
                      <th className="py-2 px-4 border-b text-left">Schedule</th>
                      <th className="py-2 px-4 border-b text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnrollments.length > 0 ? (
                      filteredEnrollments.map((enrollment) => (
                        <tr key={enrollment._id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">{enrollment.tutorName}</td>
                          <td className="py-3 px-4 border-b">{enrollment.session}</td>
                          <td className="py-3 px-4 border-b">{enrollment.venue}</td>
                          <td className="py-3 px-4 border-b">
                            <div className="text-sm">
                              {enrollment.timeSlots.map((slot, index) => (
                                <div key={index}>
                                  {slot.day}: {slot.startTime} - {slot.endTime}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4 border-b">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {enrollment.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-4 text-center text-gray-500">
                          No enrollments found with the selected filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer - Keep as is */}
      <footer className="bg-green-500 p-4 text-white mt-auto">
        <div className="container mx-auto">
          {/* Footer content if needed */}
        </div>
      </footer>
    </div>
  );
};

export default StudentProfile;