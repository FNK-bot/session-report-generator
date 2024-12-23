const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

passport.use(new googleStrategy({
    clientID: process.env.client_id,
    clientSecret: process.env.client_secret,
    callbackURL: '/google/callback',
},
    async (accToken, refToken, profile, cb) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (user) {

                console.log(profile.emails[0].value, 'user Exist')
                return cb(null, user, {
                    message: 'User Already Exist'
                })
            }
            else {
                let newUser = await User.create({
                    userName: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    isGoogle: true,
                    picture: profile.photos[0]?.value,
                    onBoarding: true

                })
                // console.log(profile)
                console.log(profile.emails[0].value, 'user created')
                return cb(null, newUser)


            }


        } catch (error) {
            console.error(`/googele auth/ :error => ${error}`)
            return cb(error, null)
        }
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    User.findById(id).then((user) => {
        cb(null, user)
    })
        .catch((err) => {
            cb(err, null)
        })
})

module.exports = passport;  