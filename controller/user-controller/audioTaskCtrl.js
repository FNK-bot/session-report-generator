const SessionModel = require('../../models/sessionDetailsModel');
const UserModel = require('../../models/userModel')
const basicTemplate = require('../../report-templates/audio-task/basic');

const getAudioTaskReportForm = async (req, res) => {
    try {
        let userId = req.session.user_id

        const user = await UserModel.findById(userId)
        let data = await SessionModel.findOne({ userId: req.session.user_id })

        res.render('user-views/audio-task-report-form', { students: data.students, user })
    } catch (error) {
        console.error('Error in getAudioTaskReportForm  ', error)
    }
};

const postAudioTaskReportForm = async (req, res) => {
    try {

        let userId = req.session.user_id;

        const user = await UserModel.findById(userId);


        const { audioTaskOverview, submitions, tldvLink, date } = req.body;

        let userDetails = await SessionModel.findOne({ userId: req.session.user_id })


        let report = await basicTemplate(userId, date, audioTaskOverview, submitions, user.userName)

        res.render('user-views/result', { report, user, title: 'Audio Task Report' });
    } catch (error) {
        console.error(`error in postAudioTaskReportForm`, error);
    }
};
module.exports = { getAudioTaskReportForm, postAudioTaskReportForm }