import mongoose from "mongoose";
import 'dotenv/config';
import findOrCreate from 'mongoose-findorcreate';

const customerSchema = new mongoose.Schema({
  email:String,
  name:String
})

customerSchema.plugin(findOrCreate);

const customerModel=mongoose.model('customer',customerSchema);
export  default customerModel;