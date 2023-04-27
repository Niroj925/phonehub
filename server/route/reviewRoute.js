import {Router} from 'express';
import  ReviewController from '../controller/reviewController.js'


const router =Router();

const reviewController=new ReviewController();


router.post('/add',reviewController.addReview);
// router.put('/update',reviewController.updateReview);
// router.post('/remove',reviewController.removeReview)
// router.get('/get',reviewController.getReview);

export default router;