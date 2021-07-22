const helmet = require("helmet");
const compression= require("compression");
const Express= require('express');
const errorMiddleware = require("./middleware/exception_middleware")
const {Logger} = require("./utility/Logger")
const handlebars = require("./setup/handlebars")
const mongoDb = require("./setup/mongoDb")
const parser = require("./setup/parser")
require('express-async-errors');



///Routes
//This is where you declare routes



////

if (process.env.NODE_ENV !== 'production') {
    Logger.SetConsoleLogger()
    }
    
    process.on('unhandledRejection',(ex)=>{
      Logger.error(ex.message,ex)
    })
    
    process.on('uncaughtException',(ex)=>{
      Logger.error(ex.message,ex)
    })

    const app = Express();
    app.use(Express.json());
    app.set('port', process.env.PORT || 3000)
    parser(app)
    mongoDb(app)
    handlebars(app,__dirname)


    ///Pipeline
    //This is where you register routes



    app.get("/errorlogs",async (req,res,)=>{
        res.sendFile(`${__dirname}/error.log`)
      })
    app.get('*', function(req, res) {  res.send('Not found');});
    app.use(errorMiddleware)
    ///Pipeline End



    app.listen(app.get('port'), function() {
        Logger.info(`server listening on port ${app.get('port')}`)
        });