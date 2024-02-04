var mongoose = require("mongoose");

var bookingSchema = mongoose.Schema({
    name: { type: String, required: true},
    seats: { type: Number, required: true, default: 40},
    type: { type: String, required: true, default: 'ordinary'},
    active: { type: Boolean, default: true}
},
 { collection: "bookings" , timestamps: true });

var Bookings = mongoose.model('Bookings', bookingSchema);

module.exports = Bookings;