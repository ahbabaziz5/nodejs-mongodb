const app = require("express");
const router = app.Router();
const userModel = require("../Model/userSchema")

router.get("/",async(req,res)=>{
    const user = await userModel.find()
    res.send({
        user,
    })
})
// router.get("/:id",(req,res)=>{
//     res.send({
//         status : 200,
//         msg : "user rootes"
//     })
// })
router.post("/",async(req,res)=>{
    console.log(req.body);
    const user = await userModel.create({...req.body})
    res.send({
        user,
    })
})

// router.put("/",(req,res)=>{
//     res.send({
//         status : 200,
//         msg : "user rootes"
//     })
// })
// router.delete("/",(req,res)=>{
//     res.send({
//         status : 200,
//         msg : "user rootes"
//     })
// })


module.exports = router