const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // For JWT verification
const UserAuthor = require('../Models/userAuthorModel'); // Import your user/author model

// Endpoint to check user status
router.get('/check-status', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token using the CLERK_SECRET_KEY from .env
    const decoded = jwt.verify(token, process.env.CLERK_SECRET_KEY); // Use Clerk's secret key
    const userEmail = decoded.email; // Assuming the token contains the user's email

    // Find the user in the database
    const user = await UserAuthor.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's status
    res.status(200).json({
      message: 'User status retrieved successfully',
      status: user.isActive ? 'active' : 'blocked', // Return 'active' or 'blocked'
    });
  } catch (error) {
    console.error('Error checking user status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;