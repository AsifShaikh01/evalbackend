const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/User.model");

const userRouter = express.Router();

userRouter.post("/register" , async (req,res)=>{
   const {name ,email, gender , password , age, city} = req.body;
   try {
       const alreadyUser = await UserModel.findOne({email});
       if(alreadyUser){
          res.send("User already exist, please login")
       }

       const hashedPassword = await bcrypt.hash(password , 10);
       const user = new UserModel({email , name , gender , password:hashedPassword , age , city});
       await user.save();

       const token = jwt.sign({email:user.email , id:user._id} , "masai");
       res.send({"msg":"User successfully registered" , "token" : token})
   } catch (error) {
    console.log(error)
      res.send(error)
   }
})
userRouter.post("/login" , async (req,res)=>{
    const {email , password} = req.body;
    try {
        const alreadyUser = await UserModel.findOne({email});
        if(!alreadyUser){
            res.send("User not found");
        }

        const matchPassword = await bcrypt.compare(password , alreadyUser.password);
        if(!matchPassword){
            res.send("Wrong Credentials");
        }
        const token = jwt.sign({email:alreadyUser.email , id : alreadyUser._id} , "masai");
        res.send({"msg":"Login Successfull" , "token":token})
        
    } catch (error) {
        res.send(error)
    }
})


module.exports={
    userRouter
}