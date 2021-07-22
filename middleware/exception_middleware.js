const {Logger} = require("../utility/logger");

module.exports = function(err,req,res,next){
    res.status(500).send('Something failed')
    Logger.error(err.message,err)
}
