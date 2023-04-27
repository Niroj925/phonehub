
import userModel from '../model/userModel.js';
import productModel from '../model/productModel.js';
import generateToken from '../config/generateToken.js';
import bcrypt from 'bcrypt';
import "dotenv/config";

export default class AuthController{
    async register(req,res){
        const emails=await userModel.findOne({email:req.body.email});
        
        if(emails){
            res.json({msg:'email already exist'});
        }else{
          try {
            const response = await userModel.create({...req.body});
            // const token = generateToken(response._id);
            if (response === null) {
              return res.json([]);
            } else {
                  res.status(200).json({response})
            //   return res.json({...response.toObject(), token}); // Add the token to the response object
            }
          } catch (err) {
            return res.json(err);
          }
          
        }  
}

async authUser(req,res){
       
  try{
      //response of database
      const response=await userModel.findOne({ email:req.body.email});
      // console.log(response);
      
      if(response===null){
          return res.json({success:false,msg:"user does not exist"});
      }else{
          //comapre with previously set credentials
          const match=bcrypt.compareSync(req.body.password,response.password);

          if(match){
              console.log('valid user')

            const token=  generateToken(response._id);
             
              console.log(token);

               res.json({...response.toObject(), token}); 
          }else{
              res
              .status(403)
              .json({success:false,message:"invalid credentials"});
          }
      }
  }catch(err){
   res.json(err);
  }
}

async getAllUsers(req, res) {
  const keyword = req.query
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // get login user id from middleware validation
  const userId = req.userId; 
   console.log(userId);
  const users = await userModel.find({
    ...keyword,
    _id: { $ne: userId },
  });

  res.json(users);
}

async getProduct(req, res) {
    try {
        // console.log(req.body.userId);
      const products = await productModel.find({ user: req.body.userId }).populate('user');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


}