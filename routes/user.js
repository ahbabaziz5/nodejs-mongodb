const app = require("express");
const router = app.Router();
const userModel = require("../Model/userSchema")
const sendResponse = require('../helpers/sendResponse')




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
router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const user = await userModel.create({ ...req.body })
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