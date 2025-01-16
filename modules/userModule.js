const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            require:[true,"Please add the username"]
        },
        email:{
            type:String,
            require:[true,"Please add email address"],
            unique:[true," Email address already taken"]
        },
        password:{
            type:String,
            require:[true,"please add user password"]
        }
    },{
        timestamp:true
    }
)

module.exports = mongoose.model("Users",userSchema);