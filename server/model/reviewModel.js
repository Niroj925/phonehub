import mongoose, { Schema }  from "mongoose";

const reviewSchema = mongoose.Schema({
     productId:{type:mongoose.Schema.Types.ObjectId,ref:'product',required:true},
     review:[{
     customerId:{ type:mongoose.Schema.Types.ObjectId, ref: 'customer', required: true },
     rating: { type: Number, required: true },
     comment: { type: String, required: false },
     createdAt: { type: Date, default: Date.now }
     }]
   
  }, {
    timestamps: true
  });
  
  const reviewModel=mongoose.model("review",reviewSchema);

  export default reviewModel;