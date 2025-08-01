import express from 'express'
import getCurrentuser from '../middlewares/getCurrentUser.js';
import upload from '../middlewares/multer.js';
import { addNew, deleteMember, editMember, renew } from '../controller/member.controllers.js';


const memberRouter = express.Router();

memberRouter.post("/addmember",getCurrentuser,upload.single("image"),addNew)

memberRouter.put("/renew/:id", getCurrentuser, renew);
memberRouter.put("/update-member/:editid", getCurrentuser, editMember);
memberRouter.delete("/delete/:id", getCurrentuser, deleteMember);

export default memberRouter;