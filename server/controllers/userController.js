import Order from '../models/order.js';
import Favorite from '../models/favorite.js';
import Product from '../models/product.js';

// Get user's saved items (favorites)
export const getSavedItems = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id })
      .populate('product')
      .sort({ createdAt: -1 });
    
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved items', error: error.message });
  }
};

// Get user's order history
export const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('product')
      .populate('vendor', 'username email')
      .sort({ date: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order history', error: error.message });
  }
};

// Get user's favorites
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id })
      .populate('product')
      .sort({ createdAt: -1 });
    
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
};

// Add product to favorites
export const addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;
    
    // Check if already in favorites
    const existing = await Favorite.findOne({ user: req.user.id, product: productId });
    if (existing) {
      return res.status(400).json({ message: 'Product already in favorites' });
    }
    
    const favorite = new Favorite({
      user: req.user.id,
      product: productId
    });
    
    await favorite.save();
    await favorite.populate('product');
    
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites', error: error.message });
  }
};

// Remove from favorites
export const removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    
    await Favorite.findOneAndDelete({ user: req.user.id, product: productId });
    
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites', error: error.message });
  }
}; 