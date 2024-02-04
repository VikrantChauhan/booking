var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require("./../config/passport");
var BookingController = require("./../controllers/booking")


router.get('/seats', BookingController.getAllBuses);
router.post('/addBus', BookingController.bookBus);
router.patch('/seats/:id', passport.authenticate('jwt', {session: false}), BookingController.bookSeat);
router.patch('/reset/:id', passport.authenticate('jwt', {session: false}),passportConfig.isAdmin(), BookingController.resetAllSeats);

module.exports = router;
