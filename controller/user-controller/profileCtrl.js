const SessionModel = require('../../models/sessionDetailsModel');
const UserModel = require('../../models/userModel')


const getProfile = async (req, res) => {
    try {
        let userId = req.session.user_id

        const user = await UserModel.findById(userId)

        const alertMessage = req.session.alertMessage;
        req.session.alertMessage = null;

        res.render('user-views/profile', { user, alertMessage })

    } catch (error) {

        console.error(`Error in get Profile :`, error)
    }
};



// Update user details
const postEditUser = async (req, res) => {
    const { userName, email, batch } = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.session.user_id,
            { userName, email, batch: batch.toUpperCase() },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.session.alertMessage = {
            type: 'success',
            message: 'Updated Successfully'
        };
        res.redirect('/profile')
    } catch (error) {
        console.error('Error in post edit user :', error)
    }
};



//  edit session details

const getEditSessionDetails = async (req, res) => {
    try {
        let userId = req.session.user_id

        const user = await UserModel.findById(userId)
        const sessionDetails = await SessionModel.findOne({ userId: user._id });
        res.render('user-views/edit-session-details', { user, sessionDetails })
    } catch (error) {
        console.log('error in get edit details', error)
    }
}

const postEditSessionDetails = async (req, res) => {
    const {
        students, // Array of student names
        coordinators, // Array of coordinator names
        trainer,
        batch, // Array of batch strings
        startTime,
        endTime,

    } = req.body;

    try {
        const updateDoc = {
            students: Array.isArray(students) ? students.map(s => s.trim().toUpperCase()) : [students.trim().toUpperCase()],
            coordinators: Array.isArray(coordinators) ? coordinators.map(c => c.trim().toUpperCase()) : [coordinators.trim().toUpperCase()],
            trainer: trainer.toUpperCase(),
            batch: Array.isArray(batch) ? batch.map(b => b.trim().toUpperCase()) : [batch.trim().toUpperCase()],
            startTime,
            endTime,
            userId: req.session.user_id,

        }

        await SessionModel.findOneAndUpdate({ userId: req.session.user_id }, updateDoc)


        req.session.alertMessage = {
            type: 'success',
            message: 'Updated Successfully'
        };
        // Redirect to profile
        res.redirect('/profile');
    } catch (error) {
        console.error('Error on post edit details:', error);

    }
};


module.exports = { getProfile, postEditUser, getEditSessionDetails, postEditSessionDetails }