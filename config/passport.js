const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport = require('passport');
const envConfig = require('config');
const thisEnv = envConfig.get('environment');
var Users = require("./../models/user");

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

exports.isAdmin = function () {
    return function (req, res, next) {
        if (req.user) {
            if (req.user.role == 'admin') {
                next();
            } else {
                res.send(403, 'Unauthorized Access');
            }
        } else
            res.send(401, 'Session Expired');
    };
};

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : thisEnv.jwtSecretKey
    },
    function (jwtPayload, cb) {
        console.log("user", jwtPayload)
        return Users.findById(jwtPayload.sub,{ name:1,email:1, role:1,active:1,__enc_email : 1})
            .then(user => {
                console.log(user)
                return cb(null, user);
            })
            .catch(err => {
                console.log(err)
                return cb(err);
            });
    }
));