const asyncHandler = require("express-async-handler")

const getContacts = asyncHandler(  async (req,res) =>{
    res.status(200).json({message: "get all contact"})
})

const createContact = asyncHandler( async (req,res) =>{
    console.log("Body of contact",req.body);
    const {title,subject,mark} = res.body
    if(!title || !subject || !mark){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }

    res.status(201).json({message:"create contact"})
})

const getContact = asyncHandler( async (req,res) =>{
    res.status(200).json({message:`get specific contact ${req.params.id}`})
})

const updateContact = asyncHandler( async (req,res) =>{
    res.status(200).json({message:`update contacts id ${req.params.id}`})
})

const deleteContact = asyncHandler( async (req,res) =>{
    res.status(200).json({message:`delete contact id ${req.params.id}`})
})

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};