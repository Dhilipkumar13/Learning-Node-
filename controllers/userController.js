const asyncHandler = require("express-async-handler")
const Users = require("../modules/userModule")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async (req,res)=>{

    const {username,email,password} = req.body;
    if(!username || !email || !password)
    {
        res.status(404);
        throw new Error("All fields are required!")
    }

    const userAvailable = await Users.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already exists!")
    }

    const hashPassword = await bcrypt.hash(password,10)
    const user = await Users.create({
        username,
        email,
        password:hashPassword        
    })

    if(user)
        res.status(200).json({_id:user.id,email:user.email})
    else{
        res.status(400)
        throw new Error("User data is not valid")
    }

    res.status(200).json({message:"register user"})
})

const loginUser = asyncHandler(async (req,res)=>{

    const {email,password} = req.body;
    if(!email || !password)
    {
        res.status(404);
        throw new Error("All fields are required!")
    }
    
    const user = await Users.findOne({email})

    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user:{
                    username:user.name,
                    email:user.email,
                    id:user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"1m"}
        )
        res.status(200).json({accessToken})
    }
    else{
        res.status(400)
        throw new Error("Invalid username or password")
    }
})

const currentUser = asyncHandler(async (req,res)=>{
    res.status(200).json({message:"current user"})
})

module.exports = {registerUser,loginUser,currentUser}