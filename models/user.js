var mongoose = require("mongoose");
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
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

 userSchema.plugin(mongooseFieldEncryption, { 
    fields: ["email", "password"], 
    secret: thisEnv.dbEncKey,
    saltGenerator: function (secret) {
      return thisEnv.dbEncKey;
    },
  });

var Users = mongoose.model('Users', userSchema);

module.exports = Users;