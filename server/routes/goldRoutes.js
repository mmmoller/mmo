const IsAuth = require('../config/auth');
const User = require('../models/user');
const GoldMethod = require("../methods/gold")

module.exports = app => {

    app.get("/get_gold", IsAuth, (req, res) => {
        res.status(200).send(
            {
                gold: req.user.gold,
                message: "gold retrieved"}
            )
    });

    app.post("/add_gold", IsAuth, async (req, res, next) => {
        try {
            let finalAmount = await GoldMethod.UpdateGold(req.user, req.body.gold, next)
            
            // console.log("req.user.gold: " + req.user.gold)
            console.log("finalAmount: " + finalAmount)

            // await User.findOne({_id: req.body.userId}).then(user => {
            //     if (user) console.log("user.gold (from db): " + user.gold)
            // }

            // TESTE
            //console.log("is also here?")
            res.status(200).send({gold: finalAmount})

        } catch(err) {
            //console.log("is here?")
            next(err)
        }
    });

    // app.post("/add_gold", IsAuth, (req, res) => {
    //     try {
    //         User.findOne({_id: req.body.userId}).then(user => {
    //             if (user) {
    //                 if (isNaN(user.gold)) user.gold = 0;
    //                 user.gold = user.gold + req.body.gold
    //                 user.save().then(savedUser => {
    //                     res.status(200).send(
    //                         {
    //                             gold: savedUser.gold,
    //                             message: "gold retrieved"
    //                         }
    //                     )
    //                 })
    //             } else {
    //                 res.status(401).send(
    //                     {
    //                         message: "no user found",
    //                         err: err
    //                     }
    //                 )
                  
    //             }
    //         });
    //     } catch(err) {
    //         res.status(401).send(
    //             {
    //                 message: "check .err",
    //                 err: err
    //             }
    //         )
    //     }
    // });

    
}