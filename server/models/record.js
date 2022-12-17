var mongoose = require('mongoose');

var recordSchema = mongoose.Schema({

    name: String,
    position: String,
    level: String,

}, {minimize: false});

// create the model for users and expose it to our app
module.exports = mongoose.model('Record', recordSchema);