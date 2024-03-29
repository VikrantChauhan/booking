var mongoose = require("mongoose");
const envConfig = require('config');
const thisEnv = envConfig.get('environment');

var userSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, required: true, default: 'user'},
    active: { type: Boolean, default: true}
},
 { collection: "users" , timestamps: true });

var Users = mongoose.model('Users', userSchema);

module.exports = Users;