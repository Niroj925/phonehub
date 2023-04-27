import mongoose from "mongoose";

const featureSchema = mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true }
});

const mobileSchema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: false },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: false },
  features: [featureSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, {
  timestamps: true
});

const productModel = mongoose.model('product', mobileSchema);

export default productModel