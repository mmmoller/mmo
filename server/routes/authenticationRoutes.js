const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET

module.exports = app => {

    app.post('/login_user', (req, res, next) => {
        passport.authenticate('login', (err, users, info) => {
            if (err) {
                console.error(`error ${err}`);
            }
            if (info !== undefined) {
                console.error(info.message);
            if (info.message === 'bad username') {
                res.status(401).send(info.message);
            } else {
                res.status(403).send(info.message);
            }
            } else {
                req.logIn(users, () => {
                    User.findOne({
                        username: req.body.username,
                    }).then(user => {
                        res.status(200).send(clientRes(user, 'user local authenticated'))
                        // const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: 60 * 60 * 24,});
                        // res.status(200).send({
                        //     auth: true,
                        //     user: clientUser(user),
                        //     token,
                        //     message: 'user found & logged in',
                        // });
                    });
                });
            }
        })(req, res, next);
    });

    app.post('/logout_user', function(req, res) {
        req.logout(function(err) {
			if (err) {
                res.status(405).send({err});
            } else {
                res.status(200).send({message: "user logout"})
            }
		});
    });

    app.post('/login_token_user', (req, res, next) => {
        console.log("here")
        passport.authenticate('jwt', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (user) {
                
                //const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: 60 * 60 * 24,});
                res.status(200).send(clientRes(user, 'user jwt authenticated'))
            } else {
                console.error('jwt id and username do not match');
                res.status(403).send('username and jwt token do not match');
            }
        })(req, res, next);
    });

    app.post('/register_user', (req, res, next) => {
        passport.authenticate('register', (err, user, info) => {
            if (err) {
                console.error(err);
            }
            if (info !== undefined) {
                console.error(info.message);
                res.status(403).send(info.message);
            } else {
            // eslint-disable-next-line no-unused-vars

                req.logIn(user, error => {
                    console.log(user);
                    console.log(error)

                    res.status(200).send(clientRes(user, "user created"));
                    // const data = {
                    //   first_name: req.body.first_name,
                    //   last_name: req.body.last_name,
                    //   email: req.body.email,
                    //   username: user.username,
                    // };
                    // console.log(data);
                    // User.findOne({
                    //   where: {
                    //     username: data.username,
                    //   },
                    // }).then(user => {
                    //   console.log(user);
                    //   user
                    //     .update({
                    //       first_name: data.first_name,
                    //       last_name: data.last_name,
                    //       email: data.email,
                    //     })
                    //     .then(() => {
                    //       console.log('user created in db');
                    //       res.status(200).send({ message: 'user created' });
                    //     });
                    // });
                });
            }
        })(req, res, next);
    });

    function clientRes(user, message){
        return {
            auth: true,
            user: clientUser(user),
            token: jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: 60 * 60 * 24}),
            message: message
        }
    }

    function clientUser(user){
        return {
            username: user.username,
            _id: user._id,
            //gold: user.gold,
            data: user.data
        }
    }

    

};