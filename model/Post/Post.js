const mongoose = require('mongoose')

//schema design

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, 'Post title is required'],
        trim : true,
    },
    description:{
        type: String,
        required: [true, 'Description is required'],
    },
    //modelby reference
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: [true,'Post category is required']
    },
    numViews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
],
    likes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
     },
],
    disLikes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    },
],

    comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Comment',
    },
],
// user{author of the blog}
    user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:[true,'Author is required']
},
    photo:{
        type: String,
        required:[true,'Image is required']
    },
},
    {
        timestamps:true,
    }
)

const Post=mongoose.model('Post', postSchema)
module.exports=Post