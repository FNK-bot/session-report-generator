const express = require('express');
const router = express.Router();
const isLogged = require('./middleware/isLogged')
const { getResult } = require('../controller/user-controller/resultCtrl')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('user-views/landing');
});

router.get('/generate', isLogged, (req, res) => {
  res.render('user-views/main')
});

router.post('/generate', isLogged, getResult);

router.get('/login', (req, res) => {
  res.render('user-views/login')
});

// router.post('/login', (req, res) => {
//   const { googleId, email, phone, username } = req.body;
//   username.create(
//   )
// });

// // directing to google api
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// //  handle callback from Google
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/register' }), googleAuth);
