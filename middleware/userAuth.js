
const isLogged = (req, res, next) => {
    try {
        if (req.session.isLogged) {

            let findUser = User.findById(req.session.id);
            if (!findUser.isComplete) {
                res.redirect('/bording')
            }
            next()
        }
        else {
            req.session.userReturnTo = req.originalUrl;

            res.redirect('/login')
        }
    } catch (error) {

    }
};

module.exports = isLogged;