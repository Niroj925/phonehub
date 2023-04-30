import mongoose from "mongoose";

const featureSchema = mongoose.Schema({
  name: { type: String, required: false },
  value: { type: String, required: false }
});

const mobileSchema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image:{type:String,required:true},
  price: { type: Number, required: true },
  countInStock: { type: Number, required: false },
  features: [featureSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, {
  timestamps: true
});

const productModel = mongoose.model('product', mobileSchema);

export default productModel