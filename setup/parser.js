const BodyParser=require('body-parser');

module.exports=function (app){
    app.use(BodyParser.urlencoded({extended:true}));
}