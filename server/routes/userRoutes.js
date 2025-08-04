import express from 'express';
import { 
  getSavedItems, 
  getOrderHistory, 
  getFavorites, 
  addToFavorites, 
  removeFromFavorites 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get user's saved items
router.get('/saved', getSavedItems);

// Get user's order history
router.get('/orders', getOrderHistory);

// Get user's favorites
router.get('/favorites', getFavorites);

// Add product to favorites
router.post('/favorites', addToFavorites);

// Remove product from favorites
router.delete('/favorites/:productId', removeFromFavorites);

export default router; 