const User = require('../models/userModel')

const isLogged = async (req, res, next) => {
    try {
        if (req.session.isLogged) {
            console.log('l***************m')
            console.log('lmy')
            let findUser = await User.findById(req.session.user_id);
            console.log(findUser)
            if (findUser.onBoarding) {
                console.log('ss')
                return res.redirect('/on-bording')
            }

            next()

        }
        else {
            console.log('lm--------------n')
            if (!req.session.returnPath) {
                req.session.returnPath = req.originalUrl;
                console.log(req.session.returnPath)
            }

            res.redirect('/auth/google')
        }
    } catch (error) {

    }
};

module.exports = isLogged;