const express = require("express")
const app = express()
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://blog:blog@cluster0.nh3jk8t.mongodb.net/').then(()=>{
    console.log("mongoose connected");
})
.catch((err)=>{
console.log("mongoose not connected",err);
})




app.use(morgan("tiny"))
app.use(express.json())
app.use("/user",userRoute)
app.use("/blog",blogRoute)





app.get("/",(req,res)=>{
    res.send({
        status:200,
        msg: "server is running properly"
    })
})


const port = 3000;
app.listen(port,()=>{
    console.log("server is created and running");
})