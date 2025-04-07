import {dbConnect} from "lib/db/models/enroll"
import enroll from "../../../../../lib/db/models/enroll";
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  // Check authentication
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  await dbConnect();
  
  try {
    // Get all enrollments for the current student
    const enrollments = await enroll.find({ userId: session.user.id })
      .sort({ enrolledAt: -1 });
    
    return res.status(200).json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
}