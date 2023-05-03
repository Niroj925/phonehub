import {Router} from 'express';
import  CustomerController from '../controller/customerController.js'
import passport from 'passport';
import '../auth.js';
const router =Router();

const customerController=new CustomerController();

router.get('/auth/google',

passport.authenticate("google",{scope:['profile','email']}),
);

router.get('/auth/google/callback',

passport.authenticate("google",{
    // successRedirect:`http://localhost:3000`,
    // failureRedirect:'/login/failed',
}),
customerController.googleauth

)


export default router;