import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'revoked'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', ProductSchema); 