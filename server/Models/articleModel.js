const mongoose=require("mongoose");

//create author schema
const authordataScheme=new mongoose.Schema({
    nameOfAuthor:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
    }
},{"strict":"throw"})

//ceate user comment schema

const usercommentSchema=new mongoose.Schema({
    nameOfUser:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{"strict":"throw"})

//create Artticle Scehma
const articleSchema=new mongoose.Schema({
    authorData: authordataScheme,

    articleId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    dateOfCreation:{
        type:String,
        required:true
    },
    dateOfModification:{
        type:String,
        required:true
    },
    comments: [usercommentSchema],
    isArticleActive:{
        type:Boolean,
        required:true
    }
},{"strict":"throw"})

const Article=mongoose.model('article',articleSchema)
module.exports=Article;