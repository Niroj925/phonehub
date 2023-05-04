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

async  getOrderByUsrId(req, res) {
  const userId = req.body.userId;

  try {
    const response = await orderModel.find({ user: userId }).populate('orderItems.product','name brand');
    if (response.length === 0) {
      return res.json([]);
    } else {
      return res.status(200).json(response);
    }
  } catch (err) {
    return res.json(err);
  }
}

async updateDeliver(req,res) {
  const orderId=req.body.orderId;
  try {
    const response = await orderModel.updateOne(
      { _id: orderId },
      { isDelivered: true }
    );
   return res.status(200).json(response);
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

