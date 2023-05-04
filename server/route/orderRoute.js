import {Router} from 'express';
import  OrderController from '../controller/orderController.js'


const router =Router();

const orderController=new OrderController();


router.post('/add',orderController.addOrder);
// router.put('/update',orderController.updateOrder);
router.delete('/remove',orderController.cancelOrder)
router.post('/get',orderController.getOrderByUsrId);
router.put('/mkdelivertrue',orderController.updateDeliver);

export default router;