const app = require("express");
const router = app.Router();
const userModel = require("../Model/userSchema")
const sendResponse = require('../helpers/sendResponse')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const authenticateJWT = require("../helpers/authenticateJWT");
require('dotenv').config()
console.log( "env >>" ,process.env)


//get all users
router.get("/", async (req, res) => {
    try {
        const user = await userModel.find()
        if (user) {
            sendResponse(res, 200, user, "users found successfully", false)
        }
    }
    catch {
        sendResponse(res, 500, "users not found", true)
    }
})
//get single user
router.get("/:id", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (user) {
            sendResponse(res, 200, user, "users found successfully", false)

        }
        else {
            sendResponse(res, 403, null, 'User Not Found', true)


        }
    }
    catch {
        sendResponse(res, 500, "users not found", true)
    }
})
//post a user
router.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
        const saltRounds = 10
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
        const user = await userModel.create({ ...req.body })
        user.password = undefined;
        if (user) {
            sendResponse(res, 200, user, "users created successfully", false)
        }
        else {
            sendResponse(res, 403, null, 'User Not Found', true)

        }

    } catch {
        sendResponse(res, 500, "internal server error", true)
    }
})

//for user login
router.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email: email });


        if (user) {
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (isPasswordValid) {
                user.password = undefined;
                const token = await jwt.sign({data:user},process.env.JWT_SECRET);
                console.log(token);
                sendResponse(res, 200, {user,token}, "users loggedin successfully", false)

            }else{
                sendResponse(res, 403, null, 'User Not Found', true)
            }

        }
       

    } catch {
        sendResponse(res, 500, "internal server error", true)
    }
})
//updated a single user
router.put("/:id", async (req, res) => {

    const user = await userModel.findOne({ _id: req.params.id })
    console.log(user);
    try {
        if (user) {
            const updated = await userModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
            sendResponse(res, 200, updated, "users updated successfully", false)
        } else {
            sendResponse(res, 403, null, 'User Not Found', true)

        }
    }
    catch {
        sendResponse(res, 500, "internal server error", false)
    }

})
//deleted a single user
router.delete("/:id", async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (user) {
            sendResponse(res, 200, user, "users deleted successfully", false)

        } else {
            sendResponse(res, 403, null, 'User Not Found', true)
        }
    } catch {
        sendResponse(res, 500, "internal server error", false)

    }
})


module.exports = router