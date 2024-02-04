var mongoose = require("mongoose");

var seatsSchema = mongoose.Schema({
    number: { type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId},
    bus: { type: String, required: true},
    booked: { type: Boolean, default: false}
},
 { collection: "seats" , timestamps: true });

var Seats = mongoose.model('Seats', seatsSchema);

module.exports = Seats;