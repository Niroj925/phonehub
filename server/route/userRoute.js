import {Router} from 'express';
import  UserController from '../controller/userController.js'

import  validateToken  from "../middleware/validateToken.js";

const router =Router();

const userController=new UserController();


router.post('/register',userController.register);
router.post('/login',userController.authUser);
// router.post('/remove',userController.deleteUser)
router.get('/',userController.getAllUsers);
router.get('/getproduct/:userId', validateToken, userController.getProduct);

export default router;