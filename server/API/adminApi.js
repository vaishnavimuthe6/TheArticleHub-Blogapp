
const exp=require('express')
const adminApp=exp.Router();
const expressAsyncHandler=require("express-async-handler");
const Article=require('../Models/articleModel');
const UserAuthor=require('../Models/userAuthorModel');
const {requireAuth,clerkMiddleware}=require("@clerk/express");
const createUserOrAuthor = require('./createUserOrAuthor');
require('dotenv').config();

adminApp.get('/unauthorized',(req,res)=>{
    res.send({message:"Unauthorized request"})
})

adminApp.post('/admin',expressAsyncHandler(createUserOrAuthor));

//get all users and a
adminApp.get('/users',requireAuth({signInUrl:"unauthorized"}),expressAsyncHandler(async(req,res)=>{
    const listOfUsers=await UserAuthor.find({role:'user'});
    res.status(200).send({message:"all users",payload:listOfUsers});

}))

adminApp.get('/authors',requireAuth({signInUrl:"unauthorized"}),expressAsyncHandler(async(req,res)=>{
    const listOfAuthors=await UserAuthor.find({role:'author'});
    res.status(200).send({message:"all authors",payload:listOfAuthors});

}))

//get all articles
adminApp.get('/articles',requireAuth({signInUrl:"unauthorized"}),expressAsyncHandler(async (req, res) => {
    //read all articles from db
    const listOfAllArticles = await Article.find({});
    res.status(200).send({ message: "all articles", payload: listOfAllArticles })
}))


// // //block and unblock users 
adminApp.put('/user/:email',expressAsyncHandler(async(req,res)=>{
    const {isActive}=req.body;
    const updateUser=await UserAuthor.findOneAndUpdate(
        {email:req.params.email},
        {isActive:isActive},
        {new:true}
    );
    if(!updateUser){
        return res.status(403).send({message:"user not found"});
    }
    res.status(200).send({message:"Your account is blocked or activated",payload:updateUser});

}))




//block and unblock authors
adminApp.put('/author/:email',expressAsyncHandler(async(req,res)=>{
    const {isActive}=req.body;
    const updateAuthor=await UserAuthor.findOneAndUpdate(
        {email:req.params.email},
        {isActive:isActive},
        {new:true}
    );
    if(!updateAuthor){
       return res.status(403).send({message:"Author not found"});
    }
    res.status(200).send({message:"Your account is blocked or activated",payload:updateAuthor});

}))


adminApp.put('/articles/:articleId', expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    const latestArticle = await Article.findByIdAndUpdate(modifiedArticle._id,
        { ...modifiedArticle },
        { returnOriginal: false });
    if (!latestArticle) {
        return res.status(404).send({ message: "Article not found" });
    }
    res.status(200).send({ message: "article deleted or restored", payload: latestArticle });
}))

module.exports=adminApp;