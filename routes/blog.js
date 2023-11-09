const app = require("express");
const router = app.Router();
const blogModel = require("../Model/blogSchema")
const sendResponse = require('../helpers/sendResponse')




//get all Blogs
router.get("/", async (req, res) => {
    try {
        const user = await blogModel.find().populate("user").exec()
        if (user) {
            sendResponse(res, 200, user, "users found successfully", false)
        }
    }
    catch {
        sendResponse(res, 500, "users not found", true)
    }
})
//get single blog
router.get("/:id", async (req, res) => {
    try {
        const user = await blogModel.findById(req.params.id);
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
//post a blog
router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const user = await blogModel.create({ ...req.body })
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
//updated a single blog
router.put("/:id", async (req, res) => {

    const user = await blogModel.findOne({ _id: req.params.id })
    console.log(user);
    try {
        if (user) {
            const updated = await blogModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
            sendResponse(res, 200, updated, "users updated successfully", false)
        } else {
            sendResponse(res, 403, null, 'User Not Found', true)

        }
    }
    catch {
        sendResponse(res, 500, "internal server error", false)
    }

})
//deleted a single blog
router.delete("/:id", async (req, res) => {
    try {
        const user = await blogModel.findByIdAndDelete(req.params.id);
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