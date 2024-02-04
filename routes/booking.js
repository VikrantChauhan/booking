var express = require('express');
var router = express.Router();
var passport = require('passport');
var BookingController = require("./../controllers/booking")


router.get('/seats', BookingController.getAllBuses);
router.post('/addBus', BookingController.bookBus);
router.patch('/seats/:id', passport.authenticate('jwt', {session: false}), BookingController.bookSeat);

module.exports = router;
