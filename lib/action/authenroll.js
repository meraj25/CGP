// controllers/enrollmentController.js
import Enrollment from '../models/Enrollment.js';


// Create a new enrollment
export async function createEnrollment (req, res) {
  try {
    const { session, venue, amount, tutorName } = req.body;
    const studentId = req.session.userId; // Assuming you store the user ID in the session
    
    // Validate the request
    if (!session || !venue || !amount || !tutorName) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide all required fields' 
      });
    }
    let tutorId = null;
    const tutor = await User.findOne({ 
      name: user_name, 
     
    });
    if (tutor) {
      tutorId = tutor._id;
    }
    
    // Create the enrollment
    const enrollment = new Enrollment({
      studentId,
      session,
      venue,
      amount: parseFloat(amount),
      tutorName,
     
    });
    
    // Save the enrollment to the database
    await enrollment.save();
    
    // Return success response
    res.status(201).json({
      success: true,
      message: 'Enrollment created successfully',
      enrollment: {
        id: enrollment._id,
        session: enrollment.session,
        venue: enrollment.venue,
        amount: enrollment.amount,
        tutorName: enrollment.tutorName,
        status: enrollment.status,
        enrollmentDate: enrollment.enrollmentDate
      },
      redirectUrl: '/dashboard'
    });
  } catch (error) {
    console.error('Enrollment creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
};

// Get enrollments for the current user
export const getUserEnrollments = async (req, res) => {
  try {
    const studentId = req.session.userId;
    
    const enrollments = await Enrollment.find({ studentId })
      .sort({ enrollmentDate: -1 })
      .limit(10); // Get the 10 most recent enrollments
    
    res.status(200).json({
      success: true,
      enrollments
    });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
};

// Get enrollments for a specific tutor
export const getTutorEnrollments = async (req, res) => {
  try {
    const tutorId = req.params.tutorId || req.session.userId;
    
    const enrollments = await Enrollment.findByTutor(tutorId)
      .sort({ enrollmentDate: -1 });
    
    res.status(200).json({
      success: true,
      enrollments
    });
  } catch (error) {
    console.error('Error fetching tutor enrollments:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
};

// Update enrollment status
export const updateEnrollmentStatus = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { status } = req.body;
    
    const enrollment = await Enrollment.findById(enrollmentId);
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        error: 'Enrollment not found'
      });
    }
    
    // Check if the user has permission to update this enrollment
    // This could be either the student who created it or the tutor
    const userId = req.session.userId;
    if (enrollment.studentId.toString() !== userId && 
        enrollment.tutorId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this enrollment'
      });
    }
    
    // Update the status
    enrollment.status = status;
    await enrollment.save();
    
    res.status(200).json({
      success: true,
      message: 'Enrollment status updated successfully',
      enrollment: {
        id: enrollment._id,
        status: enrollment.status
      }
    });
  } catch (error) {
    console.error('Error updating enrollment status:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
};

// Cancel an enrollment
export const cancelEnrollment = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    
    const enrollment = await Enrollment.findById(enrollmentId);
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        error: 'Enrollment not found'
      });
    }
    
    // Check if the user has permission to cancel this enrollment
    const userId = req.session.userId;
    if (enrollment.studentId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to cancel this enrollment'
      });
    }
    
    // Update the status to cancelled
    enrollment.status = 'cancelled';
    await enrollment.save();
    
    res.status(200).json({
      success: true,
      message: 'Enrollment cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling enrollment:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
};