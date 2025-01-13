const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.status(200).json({message:"Get all contacts"})
})
router.post("/",(req,res)=>{
    res.status(200).json({message:"create contacts"})
})
router.put("/:id",(req,res)=>{
    res.status(200).json({message:`update contacts ${req.params.id}`})
})
router.delete("/:id",(req,res)=>{
    res.status(200).json({message:`delet contacts ${req.params.id}`})
})

module.exports = router