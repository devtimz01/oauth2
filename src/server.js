const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();
const data = require('../schema/schema');
const passport = require('../strategy/gmail-strategy');
require('dotenv').config();

//configure express-sesion middleware before passport initialization
 app.use(session({
    secret: process.env.SESSION_SECRET, // Use a secure key in production
    resave: false, // Don't resave session if unmodified
    saveUninitialized: true, // Save session even if unmodified
    //cookie: { secure: false } // Set to true in production with HTTPS
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//session-based auth: serialize & deserialize users 
passport.serializeUser((user,done)=>{
    console.log('inside serialized session')
    console.log('user')
    return done(null,user.id);

});

passport.deserializeUser(async(id,done)=>{
    //findUSerId to avoid re-authentication
    try{
        const findUSer = await data.findOne({_id:id});
        return findUSer? done(null,findUSer):(null,false);
    } 
    catch(err){
        console.log('error is deserialization')
        return done(err,null);
    }
});

app.get('/api/auth/google', passport.authenticate('google'));
app.get('/api/auth/google/redirect', passport.authenticate('google'),(req,res)=>{
   return res.sendStatus(200)
})

const port = 3000;
app.listen(port,()=>{
    console.log('server is running at port 3000')
});

