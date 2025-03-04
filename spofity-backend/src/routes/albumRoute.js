import express from "express";
import { addAlbum, listAlbum, removeAlbum,updateAlbumColor } from "../controllers/albumController.js";
import upload from "../middleware/multer.js";


const albumRouter = express.Router();   
albumRouter.post("/add", upload.single('image'), addAlbum);
albumRouter.get("/list", listAlbum);
albumRouter.post('/remove', removeAlbum);
albumRouter.post('/update', updateAlbumColor)

export default albumRouter;