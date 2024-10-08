const passport = require("passport");
const jwt = require("passport-jwt");
const User = require("../models/user.model.js");
const configObject = require("./env.config.js");

const JWTStrategy = jwt.Strategy;
const Jwt = jwt.ExtractJwt;


const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies[configObject.auth.cookie_token];
    }
    return token;
}

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: Jwt.fromExtractors([cookieExtractor]),
        secretOrKey: configObject.auth.jwt_secret
    }, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.user._id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
}


module.exports = initializePassport;
