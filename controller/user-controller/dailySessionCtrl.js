const SessionModel = require('../../models/sessionDetailsModel');
const UserModel = require('../../models/userModel')
const basicTemplate = require('../../report-templates/daily-session/basic');

const getSessionReportForm = async (req, res) => {
  try {
    let userId = req.session.user_id

    const user = await UserModel.findById(userId)
    let data = await SessionModel.findOne({ userId: req.session.user_id })
    console.log(data)
    res.render('user-views/daily-session-report-form', { students: data.students, user })
  } catch (error) {
    console.error('Error in getGenerate Form ', error)
  }
};

const postSessionReportForm = async (req, res) => {
  try {

    let userId = req.session.user_id

    const user = await UserModel.findById(userId);


    const { sessionOverview, attendees, tldvLink, date } = req.body;

    let userDetails = await SessionModel.findOne({ userId: req.session.user_id })


    let report = await basicTemplate(userId, date, sessionOverview, attendees, tldvLink, user.userName)

    res.render('user-views/result', { report, user, title: 'Daily Session Report' });
  } catch (error) {
    console.error(`error in get result`, error);
  }
};
module.exports = { getSessionReportForm, postSessionReportForm }