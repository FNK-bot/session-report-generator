const SessionModel = require('../../models/sessionDetailsModel');
const UserModel = require('../../models/userModel')

const getOnbording = async (req, res) => {
    try {
        let userId = req.session.user_id

        const user = await UserModel.findById(userId)
        res.render('user-views/on-bording', { user })
    } catch (error) {
        console.log('error in onb ge')
    }
}

const postOnbording = async (req, res) => {
    const {
        students, // Array of student names
        coordinators, // Array of coordinator names
        trainer,
        batch, // Array of batch strings
        startTime,
        endTime,

    } = req.body;

    try {
        // Create a new document based on your Mongoose schema
        const sessionData = new SessionModel({
            students: Array.isArray(students) ? students.map(s => s.trim().toUpperCase()) : [students.trim().toUpperCase()],
            coordinators: Array.isArray(coordinators) ? coordinators.map(c => c.trim().toUpperCase()) : [coordinators.trim().toUpperCase()],
            trainer: trainer.toUpperCase(),
            batch: Array.isArray(batch) ? batch.map(b => b.trim().toUpperCase()) : [batch.trim().toUpperCase()],
            startTime,
            endTime,
            userId: req.session.user_id,

        });

        // Save the session data
        await sessionData.save()

        // Update the user model's onboarding status
        await UserModel.findByIdAndUpdate(req.session.user_id, { onBoarding: false });

        // Redirect to profile
        res.redirect('/profile');
    } catch (error) {
        console.error('Error saving session data:', error.message);

    }
};

module.exports = {
    getOnbording, postOnbording
}