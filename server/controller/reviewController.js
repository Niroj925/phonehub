import reviewModel from '../model/reviewModel.js';
import "dotenv/config";

export default class ReviewController{
      async addReview (req, res) {
        try {
          // const { customerId, productId, rating, comment } = req.body;
          try {
            const response = await reviewModel.create({...req.body});
            if (response === null) {
              return res.json([]);
            } else {
                  res.status(200).json({response})
            }
          } catch (err) {
            return res.json(err);
          }
          }
        catch (error) {
          res.status(500).json({ message: error.message });
        }
      };
      
}

