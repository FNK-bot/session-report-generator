const passport = require('passport');
const SessionModel = require('../../models/sessionDetailsModel');
const UserModel = require('../../models/userModel');

const googleAuth = async (req, res) => {

    //handle callabck after user validated
    req.logIn(req.user, async (err) => {

        //Handle Error 
        if (err) {
            return res.redirect('/')
        }


        //Else set Access to user 
        req.session.isLogged = true;
        req.session.user_id = req.user._id;

        if (req.user.onBoarding) {
            return res.redirect('/on-bording')
        }

        //for handling the req from diffrent url
        const redirectTo = req.session.returnPath || '/';
        console.log(req.session.returnPath)
        delete req.session.returnPath; // Clean up returnTo after redirect
        return res.redirect('/')
    });
}

const logout = async (req, res) => {
    req.session.distroy()
    res.redirect('/')
}

module.exports = { googleAuth, logout }