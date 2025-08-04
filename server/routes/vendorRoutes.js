import express from 'express';
import { 
  getVendorProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getSalesAnalytics 
} from '../controllers/vendorController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication and vendor role
router.use(protect);
router.use(authorize('vendor'));

// Product management routes
router.get('/products', getVendorProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Sales analytics
router.get('/analytics', getSalesAnalytics);

export default router; 