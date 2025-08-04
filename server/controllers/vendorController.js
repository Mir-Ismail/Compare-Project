import Product from '../models/product.js';
import Order from '../models/order.js';

// Get all products for a vendor
export const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, images, price, quantity } = req.body;
    
    const product = new Product({
      name,
      description,
      images: images || [],
      price,
      quantity,
      vendor: req.user.id
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, images, price, quantity } = req.body;
    
    const product = await Product.findOneAndUpdate(
      { _id: id, vendor: req.user.id },
      { name, description, images, price, quantity },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findOneAndDelete({ _id: id, vendor: req.user.id });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Get sales analytics
export const getSalesAnalytics = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case 'hour':
        dateFilter = { date: { $gte: new Date(now.getTime() - 60 * 60 * 1000) } };
        break;
      case 'day':
        dateFilter = { date: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } };
        break;
      case 'month':
        dateFilter = { date: { $gte: new Date(now.getFullYear(), now.getMonth(), 1) } };
        break;
      case 'year':
        dateFilter = { date: { $gte: new Date(now.getFullYear(), 0, 1) } };
        break;
      default:
        dateFilter = { date: { $gte: new Date(now.getFullYear(), now.getMonth(), 1) } };
    }
    
    // Get orders for this vendor
    const orders = await Order.find({ 
      vendor: req.user.id,
      ...dateFilter
    }).populate('product');
    
    // Calculate analytics
    const totalSales = orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
    const totalOrders = orders.length;
    const totalItems = orders.reduce((sum, order) => sum + order.quantity, 0);
    
    // Group by product
    const productSales = {};
    orders.forEach(order => {
      const productName = order.product.name;
      if (!productSales[productName]) {
        productSales[productName] = { quantity: 0, revenue: 0 };
      }
      productSales[productName].quantity += order.quantity;
      productSales[productName].revenue += order.price * order.quantity;
    });
    
    res.json({
      period,
      totalSales,
      totalOrders,
      totalItems,
      productSales: Object.entries(productSales).map(([name, data]) => ({
        name,
        ...data
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
}; 