import {Router} from "express";
import AuthController from "../controller/control.js";
import {validateToken,validateOauthToken} from "../middleware/validateToken.js";
import passport from 'passport';
import {oauthuserModel} from '../model/userModel.js';
import { profile } from "console";
import '../auth.js';

const router=Router();
const authController=new AuthController();


router.get('/auth/google',

passport.authenticate("google",{scope:['profile','email']}),
);

router.get('/auth/google/callback',

passport.authenticate("google",{
    // successRedirect:`http://localhost:3000/about/ddcvcxv5454vcv`,
    // failureRedirect:'/login/failed',
}),
authController.googleauth

)

router.get('/getouser',authController.getOuser);


router.get('/login/success',authController.loginSuccess);

router.get('/login/failed',authController.loginFailed);



export default router;