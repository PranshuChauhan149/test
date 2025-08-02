import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectDb from "./config/db.js";

import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import memberRouter from "./routes/memberRouter.js";



dotenv.config();
const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: "https://test-six-sigma-65.vercel.app", // your frontend Render URL
  credentials: true // allows cookies/auth headers if needed
}));



app.get("/", (req, res) => {
  res.send("hello");
});

let PORT = process.env.PORT || 5000;
app.use("/api/user/",userRouter);
app.use("/api/member/",memberRouter);

app.listen(PORT, () => {
  connectDb();
  console.log("server is running on this port " + PORT);
});


