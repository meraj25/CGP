import mongoose from "mongoose";

// Schema for user enrollments
const EnrollmentSchema = new mongoose.Schema({
    // User who is enrolling
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Tutor information
  
    tutorName: {
        type: String,
        required: true
    },
    // Session details
    session: {
        type: String,
        required: true
    },
    // Venue information
    venue: {
        type: String, 
        required: true
    },
    // Payment information
    payment: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: 'LKR'
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending'
        },
        transactionId: {
            type: String
        },
        paidAt: {
            type: Date
        }
    },
    // Enrollment status
    status: {
        type: String,
        enum: ['active', 'cancelled', 'completed'],
        default: 'active'
    },
    // Timestamps
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    // Optional fields
    notes: {
        type: String
    },
    // Related materials
    materials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material'
    }],
    // Time table references
    timeSlots: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        startTime: {
            type: String
        },
        endTime: {
            type: String
        }
    }],
    // Recordings access
    hasRecordingAccess: {
        type: Boolean,
        default: false
    }
});




// Pre-save middleware to update the updatedAt field
EnrollmentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});
export default mongoose.models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);

