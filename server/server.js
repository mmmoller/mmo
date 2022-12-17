const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")
const session = require('express-session')
const MongoStore = require('connect-mongo');

require('dotenv').config()

const app = express();

// Authentication
const passport = require('passport');
require('./config/passport')
app.use(passport.initialize());






// DB
var mongoose = require('mongoose');
//mongoose.plugin(schema => { schema.options.usePushEach = true });
mongoose.Promise = require('bluebird');

var db_options = {
	//socketTimeoutMS: 30000,
	useNewUrlParser: true,
    useUnifiedTopology: true
};

var db_uri = process.env.MONGODB_URI

try {
    mongoose.connect(db_uri, db_options);
} catch (e){
    console.log(e)
}

//Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false ,
    saveUninitialized: true ,
    store: MongoStore.create({ mongoUrl: db_uri })
}))

app.use(passport.session())

//


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const dir = path.resolve()
const buildPath = path.join(dir, "/../client/build")
app.use(express.static(buildPath))

/*
const dbo = require("./db/conn");

dbo.connectToServer(function (err) {
    if (err) console.error(err);
});*/



var Record = require('./models/record')
var User = require('./models/user')
var Hero = require('./models/hero')



// Routes

// simple route
/*
app.get("/", (req, res) => {
  res.sendFile(buildPath + "/index.html")
});*/



//console.log("aqui")

// TEMPORARY
app.post("/reset_db", async (req, res, next) => {
    try {
        //req.logout()
        await User.remove()
        console.log("users removed.")
        await Hero.remove()
        console.log("heroes removed.")
        res.send({whatever: "Reseted!"})
    } catch (err){
        next(err)
    }
});


require('./routes/authenticationRoutes')(app);
require('./routes/heroesRoutes')(app);
require('./routes/goldRoutes')(app);



app.get("/get_user", (req, res) => {

    
    // console.log("req.session.passport")
    // console.log(req.session.passport)
    // console.log("req.user")
    // console.log(req.user)

    User.find({}, function(err, records) {
        if (err){
            console.log(err)
        }

        if (records){
            //console.log(records)
            res.json(records)

        }

        else{
            res.json({})
        }
    });

});

app.delete("/delete_user/:id", (req, res) => {


    User.findOne({_id: req.params.id}, function (err, user)  {
        if (err) {
            console.log(err)
            res.send({err: err})
        }

        user.remove( (err) => {
            if (err) {
                console.log(err)
                res.send({err: err})
            }

            res.status(200).send({message: "success"})
        });

    })
});



app.get("/get_record", (req, res) => {



    Record.find({}, function(err, records) {
        if (err){
            console.log(err)
        }

        if (records){
            //console.log(records)
            res.json(records)

        }

        else{
            res.json({})
        }
    });

});

app.post('/create_record', (req, res) => {

    let newRecord = new Record();

    
    newRecord.name = req.body.name,
    newRecord.position = req.body.position
    newRecord.level = req.body.level

    newRecord.save((err) => {
        if (err){
            console.log(err)
            res.send({err: err})
        }
    })

    res.status(200).send({message: "success"})

});


app.delete("/record_delete/:id", (req, res) => {


    Record.findOne({_id: req.params.id}, function (err, record)  {
        if (err) {
            console.log(err)
            res.send({err: err})
        }

        record.remove( (err) => {
            if (err) {
                console.log(err)
                res.send({err: err})
            }

            res.status(200).send({message: "success"})
        });

    })
});


// Default error middleware
app.use( (error, req, res, next) => {
    console.log("Our default error middleware!")
    console.log("Path: " , req.path)
    console.error("Error: ", error)
    let statusCode = error.statusCode || 500
    res.status(statusCode).send({message: error.message, status: statusCode})
    // next(error) if I want another error handler
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});