const exp=require("express");
const userApp=exp.Router();
const UserAuthor=require("../Models/userAuthorModel");
const Article=require("../Models/articleModel");
const expressAsyncHandler=require("express-async-handler");
const createUserorAuthor=require("./createUserOrAuthor");



//create new user
userApp.post("/user",expressAsyncHandler(createUserorAuthor))

//add commmnet

userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
    //get comment obj
    const commentObj=req.body;
    console.log(commentObj,req.params.articleId)
    //add commentsObj to comments array of article
    const articlewithComments=await Article.findOneAndUpdate(
        {articleId:req.params.articleId},
        {$push:{comments:commentObj}},
        {returnOriginal:false})
        //console.log(articlewithComments)

        //send res
        res.status(200).send({message:"comment added",payload:articlewithComments})

}))

module.exports=userApp;