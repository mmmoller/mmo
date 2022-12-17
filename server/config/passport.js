
const bcrypt = require('bcrypt')
const BCRYPT_SALT_ROUNDS = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const jwtSecret = process.env.JWT_SECRET

//console.log(jwtSecret)

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id); 
 // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  //done({err: "erro"}, {a: "batata"})
  User.findById(id, function(err, user) {
      done(err, user);
  });
});

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username', //req.body.username
      passwordField: 'password', //req.body.password
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      try {

        User.findOne(
            {$or: [{username: username}, {'local.email': req.body.email}]}
            ).then(user => {
          if (user != null) {
            console.log('username or email already taken');
            return done(null, false, {
              message: 'username or email already taken',
            });
          }

          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {

            let newUser = new User()
            newUser.username = username;
            newUser.local.password = hashedPassword;
            newUser.local.email = req.body.email;
            newUser.save().then(savedUser => {
              console.log('user created');
              return done(null, savedUser);
            });
          });
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    (username, password, done) => {
      try {
        User.findOne({
          username: username
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad username' });
          }
          //console.log(password)
          //console.log(user.local.password)
          bcrypt.compare(password, user.local.password).then(response => {
            if (response !== true) {
              console.log('passwords do not match');
              return done(null, false, { message: 'passwords do not match' });
            }
            console.log('user found & authenticated');
            return done(null, user);
          });
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret,
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({_id: jwt_payload.id}).then(user => {
        if (user) {
          console.log('user found in db in passport');
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);