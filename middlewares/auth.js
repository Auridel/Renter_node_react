module.exports = function (req, res, next) {
    const bearerHeader = req.headers["authorization"];
    // console.log(bearerHeader)
    if(!!bearerHeader){
        const bearer = bearerHeader.split(" ");
        req.token = bearer[1];
        next();
    }
    else res.status(403).json({message: "Forbidden! Anauthorized access"});
}