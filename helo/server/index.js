require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    // Student can handle Authentication in their API's using the Passport package
    , passport = require('passport')
    // Server: Authentication + Server -Auth (Auth0)
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , bodyParser = require('body-parser')

const app = express();

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING

} = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

// Student can create Node servers using the Express package (Serving static files)
app.use(express.static(__dirname + './../build'))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
//passport identification
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackUrl: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done) {
//Server - Middleware (Request level)
    // db calls
    const db = app.get('db');
    // massive wants arguments passed in as an array
    const { id, displayName, pic } = profile;
    db.find_user([id]).then( users => {
        // check to see if the array has an item because an empty array could be returned
        if (users[0]) {
            return done(null, users[0].id)
        } else {
            db.create_user([id, displayName, pic])
            .then( createdUser => {
                return done(null, createdUser[0].id)
            })
        }
    })
}))

passport.serializeUser( (id, done) => {
    //puts info in the session store
    return done(null, id)
})

passport.deserializeUser( (id, done) => {

    app.get('db').find_session_user([id]).then( user => {
        done(null, user[0]);
    })
})


app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    // redirects to a route upon successful completion
    successRedirect: 'http://localhost:4000/#/success',
    // redirects to a route upon failure
    failureRedirect: 'http://localhost:4000/#/failure'
}))

app.get('auth/me', function(req, res) {
    if (req.user) {
        rest.status(200).send(req.user);
    } else {
        res.status(401).send('nope');
    }
})




app.listen(SERVER_PORT, () => {
    console.log(`Listening on Port: ${SERVER_PORT}`)
});