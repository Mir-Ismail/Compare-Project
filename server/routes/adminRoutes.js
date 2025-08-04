import express from 'express';
import { 
  getDashboardStats, 
  getAllUsers, 
  getAllVendors, 
  getSupplyPurchaseDetails, 
  revokeProduct, 
  reactivateProduct, 
  getAllProducts 
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// Dashboard stats
router.get('/stats', getDashboardStats);

// User and vendor management
router.get('/users', getAllUsers);
router.get('/vendors', getAllVendors);

// Supply and purchase details
router.get('/supply-purchase', getSupplyPurchaseDetails);

// Product moderation
router.get('/products', getAllProducts);
router.put('/products/:id/revoke', revokeProduct);
router.put('/products/:id/reactivate', reactivateProduct);

export default router; 