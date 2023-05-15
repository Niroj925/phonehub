import reviewModel from '../model/reviewModel.js';
import "dotenv/config";

export default class ReviewController{
  async addReview(req, res) {
    try {
      const { customerId, productId, rating, comment } = req.body;
  
      // Check if the customerId and productId are provided
      if (!customerId || !productId) {
        return res.status(400).json({ message: 'customerId and productId are required' });
      }
  
      try {
        // Find the existing review for the given productId
        const existingReview = await reviewModel.findOne({ productId });
  
        if (existingReview) {
          // Add the new customer's review to the existing review
          existingReview.review.push({
            customerId,
            rating,
            comment,
            createdAt: Date.now(),
          });
  
          // Save the updated review
          await existingReview.save();
  
          return res.status(200).json({ message: 'Review added successfully', review: existingReview });
        }else{
  
        // If no existing review found, create a new review
        const newReview = await reviewModel.create({
          productId,
          review: [{
            customerId,
            rating,
            comment,
            createdAt: Date.now(),
          }],
        });
        return res.status(200).json({ message: 'Review added successfully', review: newReview });
      }
  
        
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
      async getReview(req, res) {
        try {
        
          const product = await reviewModel.find();
          if (!product) {
            return res.status(404).json({ message: 'Product review not found' });
          }
          res.status(200).json(product);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }


      
}

