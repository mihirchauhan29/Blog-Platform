const mongoose= require('mongoose')

// Schema design

const userSchema= new mongoose.Schema({
    firstname:{
        type: String,
        required:[true,"firstname is required"],
    },
    lastname:{
        type: String,
        required:[true,"lastname is required"],
    },
    profilephoto:{
        type: String,
    },
    email:{
        type: String,
        required:[true,"Email is required"],
    },
    password:{
        type: String,
        required:[true,"Password is required"],
    },

    isBlocked:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },

    role:{
        type:String,
        enum:["Admin","Guest"]
    },

    // model by reference
    viewers:[
        {
        type: mongoose.Schema.Types.ObjectId,  // only storing objectId of the users
        ref: 'User',  // model we are refrecing from
    },
],
    followers:[
        {
        type: mongoose.Schema.Types.ObjectId,  // only storing objectId of the users
        ref: 'User',  // model we are refrecing from
    },
],
following:[
    {
    type: mongoose.Schema.Types.ObjectId,  // only storing objectId of the users
    ref: 'User',  // model we are refrecing from
},
],

posts:[
    {
    type: mongoose.Schema.Types.ObjectId,  // only storing objectId of the users
    ref: 'Post',  // model we are refrecing from
},
],

blocked:[
    {
    type: mongoose.Schema.Types.ObjectId,  // only storing objectId of the users
    ref: 'User',  // model we are refrecing from
},
],
    

},
{
    timestamps: true,
}
)


const User=mongoose.model('User', userSchema)
module.exports=User