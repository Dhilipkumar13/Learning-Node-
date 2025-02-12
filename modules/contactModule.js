const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"Users"
    },
    name:{
        type:String,
        required:[true,"Please add contact name"]
    },
    email:{
        type:String,
        required:[true,"Please add contact email"],
        unique:[true," Email address already taken"]
    },
    phone:{
        type:String,
        required:[true,"Please add contact phone number"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("contacts",contactSchema)