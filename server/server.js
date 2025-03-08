const exp=require("express")
const app=exp();
require('dotenv').config();
//(config function for will take all the variable from .env and keep them in process.env which is a global object,that contains .env from that we can aceess )
const mongoose=require("mongoose")
const userApp=require("./API/userApi");
const authorApp=require("./API/authorApi");
const adminApp=require("./API/adminApi");

const cors=require('cors')
app.use(cors())

const port=process.env.PORT||4000;
// app.get('/api/admin-email', (req, res) => {
//     res.json({ adminEmail: process.env.ADMIN_EMAIL });
// });

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

//error handler
// app.use((err,req,res,next)=>{
//     console.log("err object in express error handler:",err)
//     res.send({message:err.message})
// })






