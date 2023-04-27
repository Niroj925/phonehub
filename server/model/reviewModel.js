import mongoose, { Schema }  from "mongoose";

const reviewSchema = mongoose.Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    product:{type:mongoose.Schema.Types.ObjectId,ref:'product',required:true},
    reviews: [
      {
        rating: { type: Number, required: true },
        comment: { type: String, required: false },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  }, {
    timestamps: true
  });
  
  const reviewModel=mongoose.model("review",reviewSchema);

  export default reviewModel;