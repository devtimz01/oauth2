const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const data = require('../schema/schema');
const express = require('express');
const session = require('express-session');
const { error } = require('console');
const { env } = require('process');
require('dotenv').config();
const app = express();

    passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:'http://localhost:3000/api/auth/google/redirect',
    scope:['profile','email']
},
//findUSer logic
async (accessToken, refreshToken, profile, done) => {
    try {
        // Find user by googleId
        const findUser = await data.findOne({ googleId: profile.id });

        if (!findUser) {
            // If user doesn't exist, create a new one
            const newUser = await data.insertMany({
                username: profile.displayName,
                googleId: profile.id
            });

            return done(null, newUser); // Return the newly created user
        }

        // If user exists, return the existing user
        return done(null, findUser);
    } 
    catch (err) {
        console.log('Error in find or create user:', err);
        return done(err, null); // Return the error
    }

}));

   module.exports = passport;


