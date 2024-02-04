var express = require('express');
var passport = require('passport');
var router = express.Router();
let UserController = require('./../controllers/user');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  res.send(req.user);
});

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

module.exports = router;
