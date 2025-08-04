import User from '../models/user.js';
import Product from '../models/product.js';
import Order from '../models/order.js';

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: 'user' });
    const vendorCount = await User.countDocuments({ role: 'vendor' });
    const productCount = await Product.countDocuments({ status: 'active' });
    const totalOrders = await Order.countDocuments();
    
    // Calculate total revenue
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
    
    res.json({
      userCount,
      vendorCount,
      productCount,
      totalOrders,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Get all vendors
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vendors', error: error.message });
  }
};

// Get supply and purchase details
export const getSupplyPurchaseDetails = async (req, res) => {
  try {
    // Get all products with vendor info
    const products = await Product.find()
      .populate('vendor', 'username email')
      .sort({ createdAt: -1 });
    
    // Get all orders with user and vendor info
    const orders = await Order.find()
      .populate('user', 'username email')
      .populate('vendor', 'username email')
      .populate('product')
      .sort({ date: -1 });
    
    res.json({
      products,
      orders
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching supply/purchase details', error: error.message });
  }
};

// Revoke a product (admin only)
export const revokeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByIdAndUpdate(
      id,
      { status: 'revoked' },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product revoked successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error revoking product', error: error.message });
  }
};

// Reactivate a product
export const reactivateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByIdAndUpdate(
      id,
      { status: 'active' },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product reactivated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error reactivating product', error: error.message });
  }
};

// Get all products for moderation
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('vendor', 'username email')
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}; 