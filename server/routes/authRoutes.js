// authRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile
} from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', authenticate, getUserProfile);
router.post('/logout', authenticate, logoutUser);

export default router;