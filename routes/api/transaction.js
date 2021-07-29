const Router = require('express').Router();
const ResponseManager = require("../../utility/response");
const { check, validationResult } = require('express-validator');
const {Transaction} = require("../../models/transaction");
const auth = require("../auth")

Router.get("/",auth.required,async(req,res)=>{
    const { payload: { id } } = req;

    if(!id){
        ResponseManager(req,res,{message:"User does not exist",code:-1})
        return
    }
    const TransactionCollection = await Transaction.find({"User":id,"Category":req.query.category}).lean()
    return res.status(200).send(TransactionCollection)
    })

Router.get("/:id",auth.required,async(req,res)=>{
    const transaction = await Transaction.findById(req.params.id).lean()
    return res.status(200).send(transaction)
    })


Router.post("/",auth.required,validateTransaction(),async(req,res)=>{
    var errors = validationResult(req).array()
    if(errors.length != 0){
        ResponseManager(req,res,{message:errors[0],code:-1})
        return
    }
    const { payload: { id } } = req;

    if(!id){
        ResponseManager(req,res,{message:"User does not exist",code:-1})
        return
    }
    req.body.User = id
    req.body.TimeAdded = Date.now()

    if(req.body.PaymentDate){
        req.body.PaymentDate = new Date(req.body.PaymentDate)
    }else{
        req.body.PaymentDate = transaction.TimeAdded
    }
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(200).send(transaction)
})


 Router.put("/:id",auth.required ,validateTransaction(),async(req,res)=>{
    var errors = validationResult(req).array()
    if(errors.length != 0){
        ResponseManager(req,res,{message:errors[0],code:-1})
        return
    }
    const transaction = await Transaction.findOneAndUpdate({"_id":req.params.id},req.body,{new:true});
    res.status(200).send(transaction)
 })

 Router.delete("/:id",auth.required,async(req,res)=>{
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted")
})




function validateTransaction(){
        return [
            check('Title')
            .not()
            .isEmpty()
            .withMessage('Title is required'),
            check('Amount')
            .not()
            .isEmpty()
            .withMessage('Amount is required'),
            check('Description')
            .not()
            .isEmpty()
            .withMessage('Description is required'),
            check('Category')
            .not()
            .isEmpty()
            .withMessage('Category Id is required')
        ]
    }

 module.exports = Router