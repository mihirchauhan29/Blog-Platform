const mongoose= require('mongoose')

//schema design

const categorySchema= new mongoose.Schema({
    //which useradding the category
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },

    title:{
        type: String,
        required: true,
    }
},
{
    timestamps:true
})

const Category= mongoose.model('Category',categorySchema)
module.exports= Category