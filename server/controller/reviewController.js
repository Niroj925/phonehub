import reviewModel from '../model/reviewModel.js';
import "dotenv/config";

export default class ReviewController{
      async addReview (req, res) {
        try {
          const { user, product, rating, comment } = req.body;
      
          const existingReview = await reviewModel.findOne({ user, product });
      
          if (existingReview) {
            // If the user has already left a review, update their existing review
            existingReview.reviews.push({ rating, comment });
            await existingReview.save();
      
            res.status(200).json(existingReview);
          } else {
            // If the user has not left a review yet, create a new review object
            const newReview = new reviewModel({
              user,
              product,
              reviews: [{ rating, comment }]
            });
            await newReview.save();
      
            res.status(201).json(newReview);
          }
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };
      
}

