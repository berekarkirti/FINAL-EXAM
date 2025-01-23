const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   title: String
}
)

const UserModel = mongoose.model("user", userSchema)

module.exports = UserModel



