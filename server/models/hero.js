var mongoose = require('mongoose');

var heroSchema = mongoose.Schema({

    name: String,
    level: Number,
    exp: Number,
    ownerId: String,
    stats: {
        str: Number,
        dex: Number,
        con: Number,
        int: Number,
        wis: Number,
        cha: Number
    },
    rebirth: {type:Object, default:{total: 0}},
    equips:{type: Object, default:{}},

    


}, {minimize: false});

// create the model for users and expose it to our app
module.exports = mongoose.model('Hero', heroSchema);