"use strict";
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const  secret  = process.env.JWT_KEY;
const userAuth = require('../dbModels/userAuth');

// Setup work and export for the JWT passport strategy
function auth() {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            userAuth.findById(user_id, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}
auth();
// exports.auth = auth;

const checkAuth = passport.authenticate("jwt", { session: false });
module.exports = checkAuth;


