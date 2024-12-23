const SessionModel = require('../../models/sessionDetailsModel');
const UserModel = require('../../models/userModel')



const getLanding = async (req, res, next) => {
    try {
        let userId = req.session.user_id

        const user = await UserModel.findById(userId)

        user ? res.render('user-views/landing', { user }) : res.render('user-views/landing', { user: null });
    } catch (error) {
        console.error('error in get Landing', error)
    }
}


module.exports = { getLanding }