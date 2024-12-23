//google auth cntrl(cb)
const googleAuth = async (req, res) => {

    //handle callabck after user validated
    req.logIn(req.user, (err) => {

        //Handle Error 
        if (err) {
            return res.render('user-views/login', { message: 'Google Login failed ' });
        }

        //Else set Access to user 
        req.session.userAuth = true;
        req.session.user_id = req.user.id;

        //for handling the req from diffrent url
        const redirectTo = req.session.userReturnTo || '/';
        delete req.session.userReturnTo; // Clean up returnTo after redirect
        return res.redirect(redirectTo)
    });
}
module.exports = googleAuth;