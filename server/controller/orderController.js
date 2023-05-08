import orderModel from '../model/orderModel.js';
import "dotenv/config";
import sendMail from '../service/sendMail.js';

  let previousOtpCode='';

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
async  getOrderByNumber(req, res) {
  const customerNumber = req.body.customerNumber;

  try {
    const response = await orderModel.find({ customerContact: customerNumber })
    .populate('orderItems.product','name brand')
    .populate('customerId','name email');
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
  const id=req.body.orderId;
  const email=req.body.customerEmail;


  if(req.body.otp){
    if (Number(previousOtpCode)===Number(req.body.otp)) {
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
}else{
  res.status(403).json({message:'Invalid OTP'})
}
  }else{

     // Generate a new OTP code and store it in the previousOtpCode variable
     previousOtpCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
     const msg = `Your OTP code to cancel order: ${previousOtpCode}. Don't share this code. Thank you.`;
     const subject='Cancel Order';
    sendMail(email,subject, msg);
     console.log(email);
     res.status(200).json({ message:`OTP sent to your mail ${email}`});
    // res.status(200).json({email:email,otp:previousOtpCode});
  }

 
}
}

