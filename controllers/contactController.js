const asyncHandler = require("express-async-handler")
const Contacts = require("../modules/contactModule")

const getContacts = asyncHandler(  async (req,res) =>{

    const contact = await Contacts.find({user_id:req.user.id})
    res.status(200).json(contact)

})

const createContact = asyncHandler( async (req,res) =>{

    const {name,email,phone} = req.body
    // console.log("single",name,phone,email)
    // console.log("Body of contact",req.body);
    
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }

    const checkContacts = await Contacts.findOne({user_id:req.user.id})
    if(checkContacts){
        res.status(400)
        throw new Error("contact already Exist!")
    }
    const contact = await Contacts.create({
        name,
        email,
        phone,
        user_id:req.user.id
    }) 

    res.status(201).json(contact)
})

const getContact = asyncHandler( async (req,res) =>{

    const contact = await Contacts.findById(req.params.id)
  //  console.log("get contact",req.params.id,contact)
    if(!contact)
    {
        res.status(404);
        throw new Error("Not Found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("Not Found")
    }
    res.status(200).json(contact)
})

const updateContact = asyncHandler( async (req,res) =>{

    const contact = await Contacts.findById(req.params.id)
  //  console.log("get contact",req.params.id,contact)
    if(!contact)
    {
        res.status(404);
        throw new Error("Not Found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("Not Found")
    }
    const updatedContact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new  : true}
    )
    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler( async (req,res) =>{

    const contact = await Contacts.findById(req.params.id)
  //  console.log("get contact",req.params.id,contact)
    if(!contact)
    {
        res.status(404);
        throw new Error("Not Found")
    }

    await contact.deleteOne()
    res.status(200).json(contact)
})

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};