const express = require("express");
const {auth} = require("../middlewares/auth.middleware")
const {PostModel} = require("../model/Post.model");
const postRouter = express.Router();

postRouter.get("/" ,auth, async (req , res)=>{
    try {
         const posts = await PostModel.find();
         res.send(posts)
    } catch (error) {
        res.send(error)
    }
})
postRouter.get("/top",auth, async(req , res)=>{
    try {
        const posts = await PostModel.find({$max:"no_of_comments"});
        res.send(posts)
   } catch (error) {
       res.send(error)
   }
})
postRouter.post("/addpost"  ,auth, async (req , res)=>{
    const payload = req.body;
    try {
        const post = new PostModel(payload);
        await post.save();
        res.send("post added")
    } catch (error) {
        res.send(error)
    }
})
postRouter.patch("/update/:id" ,auth, async (req , res)=>{
    const ID = req.params.id;
    const payload = req.body;
    try {
        await PostModel.findByIdAndUpdate({_id:ID} , payload);
        res.send("Updated Successfully")
    } catch (error) {
       res.send(error)   
    }
})
postRouter.delete("/delete/:id",auth, async (req , res)=>{
    const ID = req.params.id;
 
    try {
        await PostModel.findByIdAndDelete({_id:ID});
        res.send("deleted Successfully")
    } catch (error) {
       res.send(error)   
    }
})

module.exports={
    postRouter
}