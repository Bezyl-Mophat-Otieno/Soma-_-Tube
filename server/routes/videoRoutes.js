import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { addVideo, deleteVideo,getVideo , updateVideo,addViews ,trendingVideos , videoSubscribedTo , randomVideos , search , findByTag} from '../controllers/videoController.js';
const router = express.Router();
router.post("/upload",verifyToken,addVideo)
router.get("/find/:id",verifyToken,getVideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.put("/views/:id",verifyToken,addViews)
router.get("/trend",verifyToken,trendingVideos)
router.get("/random",verifyToken,randomVideos)
router.get("/tags",verifyToken , findByTag)
router.get("/search",verifyToken,search)
router.get("/subscriptions",verifyToken,videoSubscribedTo)



export default router;