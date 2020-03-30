const passport = require('passport'); 

module.exports = app => {
    app.post('/registerStudent', (req, res, next )=>{
        passport.authenticate('register', (err, user, info) => {
            console.log("singUp route handler!!");
        })(req, res, next);
    });
}
