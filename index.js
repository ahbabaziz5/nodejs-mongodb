const express = require("express")
const app = express()
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://blog:blog@cluster0.nh3jk8t.mongodb.net/').then(()=>{
    console.log("mongoose connected");
})
.catch((err)=>{
console.log("mongoose not connected",err);
})
const morgan = require("morgan");
const userRoute = require("./routes/user")


app.use("/user",userRoute)
app.use(morgan("tiny"))
app.use(express.json())





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