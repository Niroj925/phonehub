import mongoose  from "mongoose";


const orderItemSchema = mongoose.Schema({
  product: { type:mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema =mongoose.Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    customerName:{type:String,required:true},
    customerContact:{type:Number,required:true},
    orderItems: orderItemSchema,
    shippingAddress: {
      address: { type: String, required: true },
      location:{
       lon:{type:Number,required:false},
       lat:{type:Number,required:false},
      },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: false }
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String }
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: false },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }
  }, {
    timestamps: true
  });

  const orderModel=mongoose.model("orderItem",orderSchema);

  export default orderModel;