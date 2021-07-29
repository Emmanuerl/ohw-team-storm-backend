const Router = require('express').Router();
const ResponseManager = require("../../utility/response");
const { check, validationResult } = require('express-validator');
const Category = require("../../models/category");
const auth = require("../auth")


Router.get("/",auth.required,async(req,res)=>{
    const categoryCollection = await Category.find().lean()
    return res.status(200).send(categoryCollection)
    })

Router.get("/:id",auth.required,async(req,res)=>{
    const category = await Category.findById(req.params.id).lean()
    return res.status(200).send(category)
    })


Router.post("/",auth.required,validateCategory(),async(req,res)=>{
    var errors = validationResult(req).array()
    if(errors.length != 0){
        ResponseManager(req,res,{message:errors[0],code:-1})
        return
    }
    const category = new Category(req.body);
    await category.save();
    res.status(200).send(category)
})


 Router.put("/:id",auth.required ,validateCategory(),async(req,res)=>{
    var errors = validationResult(req).array()
    if(errors.length != 0){
        ResponseManager(req,res,{message:errors[0],code:-1})
        return
    }
    const category = await Category.findOneAndUpdate({"_id":req.params.id},req.body,{new:true});
    res.status(200).send(category)
 })

 Router.delete("/:id",auth.required,async(req,res)=>{
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted")
})



function validateCategory(){
        return [
            check('Title')
            .not()
            .isEmpty()
            .withMessage('Title is required')
        ]
    }

 module.exports = Router