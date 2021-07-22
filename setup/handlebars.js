const path =require("path");
const Express= require('express');
const ExpHandleBars=require("express-handlebars");
module.exports=function (app,__dirname){
    app.set('views',path.join(__dirname,'/views/'))
    app.engine("hbs",ExpHandleBars({
        extname:'hbs', 
        defaultLayout : "admin/admin_layout", 
        layoutsDir: path.join(__dirname,'views/layout')
    }));
    app.use("/public",Express.static("public"));
    app.set("view engine","hbs");   
}