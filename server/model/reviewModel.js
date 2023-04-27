import mongoose, { Schema }  from "mongoose";

const reviewSchema = mongoose.Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
  }, {
    timestamps: true
  });
  
  const reviewModel=mongoose.model("review",reviewSchema);

  export default reviewModel;