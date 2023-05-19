
import GoogleStrategy from'passport-google-oauth20';
import passport from 'passport';
import 'dotenv/config';
import customerModel from './model/customerAccount.js';

const{GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET}=process.env;

 passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://ecommerceback-mklr.onrender.com/user/auth/google/callback",
    // callbackURL:` http://localhost:8080/user/auth/google/callback?productId=${productId}`,
    passReqToCallback:true
  },

  async function(request, accessToken, refreshToken, profile, done) {
  
    customerModel.findOrCreate({ email: profile.emails[0].value, name: profile.displayName }, function (err, user) {
      console.log('users info:')
      console.log(user);
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  }
  
  ));


passport.serializeUser(function(user, done) {
    return done(null, user);
   });
   
   passport.deserializeUser(function(user, done) {
   
      return done(null, user);
     
   });