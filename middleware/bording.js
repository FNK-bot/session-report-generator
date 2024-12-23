const User = require('../models/userModel')

const bordingChecker = async (req, res, next) => {
    try {
        let findUser = await User.findById(req.session.user_id);
        if (req.session.isLogged && findUser && findUser.onBoarding) {
            next()
        }
        else {

            res.redirect('/auth/google')
        }
    } catch (error) {

    }
};

module.exports = bordingChecker;