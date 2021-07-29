const Mongoose=require('mongoose');

const CategorySchema=new Mongoose.Schema({
    "Title":{type:String,required:true},

})
const Category = Mongoose.model('Category',CategorySchema);

module.exports = Category