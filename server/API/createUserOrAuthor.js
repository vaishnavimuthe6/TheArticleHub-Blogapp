const UserAuthor=require("../Models/userAuthorModel")
const ADMIN_USER_ID=process.env.ADMIN_USER_ID;
require('dotenv').config();
async function createUserOrAuthor(req,res){
    //bussiness logic to create or user or Author
      //get user or author object from req
      const newUserAuthor=req.body;
      //find user by email id
      const userInDb=await UserAuthor.findOne({email:newUserAuthor.email})
      //if user or author exsisted
      if(userInDb!==null){
        //check with role
        if(newUserAuthor.role==userInDb.role){
            res.status(200).send({message:newUserAuthor.role,payload:userInDb})
        }else{
            res.status(200).send({message:"Invalid role"})
        }

      }else{
        // if(newUserAuthor.role==="admin" && newUserAuthor.clerkId!=)
        let newUser=new UserAuthor(newUserAuthor);
        let newUserOrAuthorDoc=await newUser.save();
        res.status(201).send({message:newUserOrAuthorDoc.role,payload:newUserOrAuthorDoc})
      }
}
module.exports=createUserOrAuthor;