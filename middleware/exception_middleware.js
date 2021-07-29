const {Logger} = require("../utility/logger");

module.exports = function(err,req,res,next){
    res.status(500).send(err.message)
    Logger.error(err.message,err)
}
