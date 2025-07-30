import express from "express";
import { Allmessage, messages } from "../controller/message.js";
const MesRouter = express.Router();

MesRouter.post("/message", messages);
MesRouter.get("/all", Allmessage);

export default MesRouter 