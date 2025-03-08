const exp=require("express")
const app=exp();
require('dotenv').config();

const mongoose=require("mongoose")
const userApp=require("./API/userApi");
const authorApp=require("./API/authorApi");
const adminApp=require("./API/adminApi");

const cors=require('cors')
app.use(cors())

const port=process.env.PORT||4000;

mongoose.connect(process.env.DBURL)
.then(()=>{
    app.listen(port,()=>console.log(`server listening on port ${port}..`))
    console.log("DB connection success")
})
.catch(err=>console.log("Error in db connection",err))
//body parser middleware
app.use(exp.json())
//connect Api routes
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)


app.use((err,req,res,next)=>{
    console.log("err object in express error handler:",err)
    res.send({message:err.message})
})






