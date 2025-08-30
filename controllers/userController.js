const User=require("../models/User")

//create user
exports.createUser=async(req,res)=>{
    try {
        const{fullname,email,password}=req.body;
        const existingUser=await User.findOne({email})
        if(existingUser) return res.status(400).json({message:'Email already exist'})
        
        const newUser=await User.create({fullname,email,password})
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message:'server error', error:error.message})
    }
}

//get users

exports.getUsers=async(req,res)=>{
    try {
        const users=await User.find()
        console.log("fetched user",users)
        res.json(users)
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
}

//get user using id
exports.getUserById=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        if(!user) return res.status(404).json({message:"User not found!"})
            res.json(user)
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}

//update user
exports.updateUser=async(req,res)=>{
    try {
        const{fullname,email,password}=req.body
        const user=await User.findByIdAndUpdate(
            req.params.id,
            {fullname,email,password},
            {new:true,runValidators:true}  
        )
        if(!user) return res.status(404).json({message:"User not found!"})
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}

exports.deleteUser=async(req,res)=>{
    try {
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).json({message:"User not found!"})
            res.json({message:"user deleted!"})
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}


