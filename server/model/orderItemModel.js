
import mongoose  from "mongoose";

const orderItemSchema = mongoose.Schema({
    product: { type:mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  });

  const orderItemModel=mongoose.model("item",orderItemSchema);

  export default orderItemModel;