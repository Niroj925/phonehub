import {Router} from 'express';
import  CustomerController from '../controller/customerController.js'


const router =Router();

const customerController=new CustomerController();


router.post('/register',customerController.registerCustomer);
// router.post('/login',customerController.authUser);
 // router.post('/remove',customerController.deleteUser)
router.get('/',customerController.getCustomer);

export default router;