const Mongoose=require('mongoose');

const TransactionSchema=new Mongoose.Schema({
    "Title":{type:String,required:true},
    "Category":[{type:Mongoose.Schema.Types.ObjectId,ref:"Category"}],
    "Description":{type:String,required:true},
    "Amount":{type:Mongoose.Schema.Types.Decimal128,required:true},
    "TimeAdded":{type:Number,required:true},
    "PaymentDate":{type:Number,required:true},
    "TransactionOccurence":{type:Number,default:1},
    "User":{type:Mongoose.Schema.Types.ObjectId,ref:"Users"}
})
const Transaction = Mongoose.model('Transaction',TransactionSchema);

const TransactionOccurence = {
    OneTime: 1,
    Daily: 2,
    Weekly: 3,
    Monthly:4,
    Yearly: 5
 };
 
 Object.freeze(TransactionOccurence);

module.exports = {
    Transaction,
    TransactionOccurence
}