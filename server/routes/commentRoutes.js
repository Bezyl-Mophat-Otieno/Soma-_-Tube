import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { addComment,deleteComment , getComments } from '../controllers/commentController.js';
const router = express.Router();
router.get('/:videoId',getComments)
router.post('/',verifyToken,addComment)
router.delete('/:id',verifyToken,deleteComment)




export default router;