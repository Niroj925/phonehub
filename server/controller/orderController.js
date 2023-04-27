import orderModel from '../model/orderModel.js';
import "dotenv/config";

export default class ProductController{
    async addOrder(req,res){
          try {
            const response = await orderModel.create({...req.body});
            if (response === null) {
              return res.json([]);
            } else {
                  res.status(200).json({response})
            }
          } catch (err) {
            return res.json(err);
          }
        
}

async getOrder(req,res){
  try {
    const response = await orderModel.find({});//get all order 
    if (response === null) {
      return res.json([]);
    } else {
          res.status(200).json(response)
    }
  } catch (err) {
    return res.json(err);
  }
}

async cancelOrder(req,res){
  const id=req.body.orderId
  try {
    const response = await orderModel.findByIdAndDelete(id);
    if (response === null) {
      return res.json([]);
    } else {
          res.status(200).json(response)
    }
  } catch (err) {
    return res.json(err);
  }
}
}

