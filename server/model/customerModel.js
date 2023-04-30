import mongoose  from "mongoose";

const customerSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  }, {
    timestamps: true
  });

  const customerModel=mongoose.model("customer",customerSchema);

  export default customerModel;
