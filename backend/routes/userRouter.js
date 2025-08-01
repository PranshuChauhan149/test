import express from "express";
import { currentUser, Login, Logout, SignUp } from "../controller/user.controllers.js";
import getCurrentuser from "../middlewares/getCurrentUser.js";

const userRouter = express.Router();

userRouter.post("/signup", SignUp);
userRouter.post("/login",Login );
userRouter.post("/logout",Logout );
userRouter.get("/current",getCurrentuser,currentUser);

export default userRouter 