import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectDb from "./config/db.js";
import MesRouter from "./routes/mesRoute.js";



dotenv.config();
const app = express();
app.use(express.json())
app.use(cors({
  origin: "https://test-1-7jyo.onrender.com", // your frontend Render URL
  credentials: true // allows cookies/auth headers if needed
}));



app.get("/", (req, res) => {
  res.send("hello");
});

let PORT = process.env.PORT || 5000;
app.use("/api/create/",MesRouter);

app.listen(PORT, () => {
  connectDb();
  console.log("server is running on this port " + PORT);
});
