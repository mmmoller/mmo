var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    username: String,

    gold: {type: Number, default: 0},

    local            : {
        email        : String,
        password     : String,
    },

    data: [Object],


}, {minimize: false});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);