module.exports = {
    UpdateGold : async function (user, amount, next){
        //try {
            if (isNaN(user.gold)) user.gold = 0;

            if (user.gold + amount < 0){
                let error = new Error("Not enough gold")
                error.statusCode = 405
                throw error
            } else {
                user.gold += amount;
                await user.save()
                return user.gold
            }
            /*
            let user = await User.findOne({_id: req.user.id})
            if (user){
                if (isNaN(user.gold)) user.gold = 0;
                user.gold = user.gold + amount;
                if (user.gold < 0) throw new Error("Not enough gold")
                await user.save()
                return user.gold
            } else {
                throw new Error("No user found")
            }*/
        // } catch(err) {
        //     next(err)
        // }
    }
}