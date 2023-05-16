import {Router} from 'express';
import  ReviewController from '../controller/reviewController.js'


const router =Router();

const reviewController=new ReviewController();

router.post('/add',reviewController.addReview);
// router.put('/update',reviewController.updateReview);
// router.post('/remove',reviewController.removeReview)
router.post('/get',reviewController.getReview);
router.post('/getreview',reviewController.getReviewById);

export default router;