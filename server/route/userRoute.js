import {Router} from 'express';
import  UserController from '../controller/userController.js'


const router =Router();

const userController=new UserController();


router.post('/register',userController.register);
router.post('/login',userController.authUser);
// router.post('/remove',userController.deleteUser)
router.get('/',userController.getAllUsers);
router.get('/getproduct',userController.getProduct);

export default router;