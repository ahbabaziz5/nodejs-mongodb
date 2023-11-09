const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    title :{ type: mongoose.SchemaTypes.String, required:true},
    description :{ type: mongoose.SchemaTypes.String, required:true},
    user :{ type: mongoose.SchemaTypes.ObjectId,ref:"user" ,required:true},
})
const blog = mongoose.model("blog",userSchema);
module.exports= blog