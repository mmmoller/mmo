const IsAuth = require('../config/auth');
const Hero = require('../models/hero');
const GoldMethod = require("../methods/gold")

module.exports = app => {

    // lembrar de deletar todos os heroes

    app.get("/get_heroes", IsAuth, async (req, res) => {

        try {
            let heroes = await Hero.find({ownerId: req.user._id})

            if (heroes){
                //console.log(heroes)
                res.status(200).send(heroes);
            } else {
                throw new Error("Account has no Heroes!")
            }

            //res.status(200).send({message: "is authenticated"})
        } catch (err){
            next(err)
        }

        /*
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
        });*/
    
    });

    app.post('/create_hero', IsAuth, async (req, res, next) => {
        try {

            let heroCost = -5000
            let finalGoldAmount = await GoldMethod.UpdateGold(req.user, heroCost, next)

            let nHero = new Hero();

            nHero.ownerId = req.user._id
            nHero.name = req.body.name
            nHero.level = 0
            nHero.exp = 0
            //nHero.rebirth = 0

            let totalStatsPoint = 60 + nHero.rebirth.total;
            //let missingStatsRolls = 6;
            let individualStatsMax = 14
            let individualStatsMin = 6

            for (let i = 0; i < Object.keys(nHero.stats).length; i++){
                let key = Object.keys(nHero.stats)[i]
                //console.log(key)
                let missingStatsRolls = (Object.keys(nHero.stats).length - i - 1)
                let min = Math.max(individualStatsMin, (totalStatsPoint - ((missingStatsRolls)*individualStatsMax)))
                let max = Math.min(individualStatsMax, (totalStatsPoint - ((missingStatsRolls)*individualStatsMin)))
                let val = Math.floor(min + (Math.random()*(max-min+1)))
                totalStatsPoint -= val
                nHero.stats[key] = val
            }

            //console.log(nHero)

            /*
            min = max (individualStatsMin, (totalStatsPoint - ((missingStatsRolls-1)*individualStatsMax) ) ) 41 - 2*14 = 13
            max = min (individualStatsMax, (totalStatsPoint - ((missingStatsRolls-1)*individualStatsMin) ) ) 19 - 2*6 = 7
            */

            //nHero.stats.str = Math.floor(individualStatsMin + Math.random()*)


            //nHero.stats

            await nHero.save()

            res.status(200).send({
                hero: nHero,
                gold: finalGoldAmount
            })
        }
        catch (err){
            next(err)
        }

    });
}