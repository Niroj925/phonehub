import {Router} from 'express';
import  OrderController from '../controller/orderController.js'
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
    // windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2, // maximum 10 requests allowed per windowMs
    message: 'Too many requests, please try again later.',
  });

const router =Router();

const orderController=new OrderController();


router.post('/add',orderController.addOrder);
// router.put('/update',orderController.updateOrder);
router.post('/cancel',limiter,orderController.cancelOrder)
router.post('/get',orderController.getOrderByUsrId);
router.post('/myorder',orderController.getOrderById);
router.post('/getorder',orderController.getOrderByNumber);
router.post('/makepayment',orderController.makePayment);
router.put('/mkdelivertrue',orderController.updateDeliver);

export default router;