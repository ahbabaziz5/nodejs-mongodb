const app = require("express");
const router = app.Router();
const userModel = require("../Model/userSchema")

router.get("/",async(req,res)=>{
    const user = await userModel.find()
    res.send({
        user,
    })
})
router.get("/:id",(req,res)=>{
    res.send({
        status : 200,
        msg : "user rootes"
    })
})
router.post("/",(req,res)=>{
    res.send({
        status : 200,
        msg : "user rootes"
    })
})

router.put("/",(req,res)=>{
    res.send({
        status : 200,
        msg : "user rootes"
    })
})
router.delete("/",(req,res)=>{
    res.send({
        status : 200,
        msg : "user rootes"
    })
})


module.exports = router