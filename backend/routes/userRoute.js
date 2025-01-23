const express = require("express");
const { getdata ,postdata,updatedata,deletedata } = require("../controller/usercontroller");
const userRouter = express.Router();

userRouter.get("/getdata",getdata);

userRouter.post("/postdata",postdata);

userRouter.patch("/patchdata/:id",updatedata);

userRouter.delete("/deletedata/:id",deletedata);

module.exports = userRouter;