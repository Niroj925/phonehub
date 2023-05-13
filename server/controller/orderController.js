import orderModel from '../model/orderModel.js';
import "dotenv/config";
import {sendMail,sendMailFile} from '../service/sendMail.js';
import createPDF from '../service/makepdf.js';

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

async updateDeliver(req, res) {
  const orderId = req.body.orderId;
  try {
    const order = await orderModel.findById(orderId)
    .populate('user','email')
    .populate('orderItems.product','name brand');

  
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.isDelivered = true;

    const updatedOrder = await order.save();
    console.log(updatedOrder);
    if (updatedOrder) {
      const pdfFilePath = createPDF(updatedOrder);
      const productId=updatedOrder.orderItems.product._id;
      const customerId=updatedOrder.customerId;
      const email=updatedOrder.customerEmail;
      const subject="Order bill";
      const msg=`Dear Customer Thank for purchasing this item please leave a review. http://localhost:3000/review?productid=${productId}&customerid=${customerId}.
      If any queries mail us on ${updatedOrder.user.email}.
       `;
      //send mail with pdf bile bill
      sendMailFile(email,subject,msg,pdfFilePath)
      return res.status(200).json({ success: true, pdfFilePath });
    } else {
      return res.status(500).json({ error: 'Failed to update order' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
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

