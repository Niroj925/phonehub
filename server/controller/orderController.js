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
}

