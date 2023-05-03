import GoogleStrategy from'passport-google-oauth20';
import passport from 'passport';
import 'dotenv/config';
import customerModel from './model/customerAccount.js';
import findOrCreate from 'mongoose-findorcreate';

const{GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET}=process.env;

 passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/user/auth/google/callback",
    passReqToCallback:true
  },
  async function(request, accessToken, refreshToken, profile, done) {
   const response= customerModel.find({email:profile.emails[0].value});
   console.log(response);
    //  console.log(profile);
    customerModel.findOrCreate({ email:profile.emails[0].value,name:profile.displayName}, function (err, user) {
      console.log('users info:')
      console.log(user);
      if (err) {
         return done(err);
       }
       return done(null,user);
     });
   
  }
  ));

//to read and write from passport session we have to do serialize and deserialize 
//now we can get some datas of sign in email's 
passport.serializeUser(function(user, done) {
    return done(null, user);
   });
   
   passport.deserializeUser(function(user, done) {
   
      return done(null, user);
     
   });