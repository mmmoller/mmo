module.exports = function (req, res, next) {
    //console.log(req.session)
    if (req.isAuthenticated()){
        next()
    } else {
        res.status(401).send({
            message: "User is not authenticated."
        });
    }
}