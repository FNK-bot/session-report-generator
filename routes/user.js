const express = require('express');
const router = express.Router();
const passport = require('passport');
const isLogged = require('../middleware/userAuth')
const bordingChecker = require('../middleware/bording')

const { googleAuth, logout } = require('../controller/user-controller/authCtrl')
const { getOnbording, postOnbording } = require('../controller/user-controller/bordingCtrl')
const { getLanding } = require('../controller/user-controller/landingCtrl')
const { getSessionReportForm, postSessionReportForm } = require('../controller/user-controller/dailySessionCtrl')
const { getProfile, postEditUser, getEditSessionDetails, postEditSessionDetails } = require('../controller/user-controller/profileCtrl');
const { getAudioTaskReportForm, postAudioTaskReportForm } = require('../controller/user-controller/audioTaskCtrl');


router.get('/', getLanding);

router.get('/generate-daily-session-report', isLogged, getSessionReportForm);

router.post('/generate-daily-session-report', isLogged, postSessionReportForm);

router.get('/generate-audio-task-report', isLogged, getAudioTaskReportForm);

router.post('/generate-audio-task-report', isLogged, postAudioTaskReportForm);

router.get('/on-bording', bordingChecker, getOnbording)

router.post('/on-bording', bordingChecker, postOnbording)

router.get('/profile', isLogged, getProfile);

router.post('/edit-user', isLogged, postEditUser);

router.get('/edit-session-details', isLogged, getEditSessionDetails);

router.post('/edit-session-details', isLogged, postEditSessionDetails);

router.get('/logout', logout)

// directing to google api
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
//  handle callback Form Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleAuth);


module.exports = router;
