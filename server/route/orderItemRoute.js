import {Router} from 'express';
import  OrderItemController from '../controller/orderItemController.js'


const router =Router();

const orderItemController=new OrderItemController();


router.post('/add',orderItemController.addOrderItem);
router.put('/update',orderItemController.updateOrderItem);
router.post('/remove',orderItemController.removeOrderItem)
router.get('/get',orderItemController.getOrderItem);

export default router;