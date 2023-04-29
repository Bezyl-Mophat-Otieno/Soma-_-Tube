 import express from 'express';
 import {getUser, subscribe, unsubscribe , updateUser , deleteUser , like , dislike}  from '../controllers/userController.js';
 import { verifyToken } from '../verifyToken.js';
 const router = express.Router();
// get a user 
router.get('/find/:id', getUser)
// update a user 
router.put('/:id', verifyToken ,updateUser)
// delete a user 
router.delete('/:id', verifyToken ,deleteUser)
// subscribe to a user
router.put('/sub/:id',verifyToken,subscribe)
// unsubscribe from a user
router.put('/unsub/:id',verifyToken,unsubscribe)
// like a video
router.put('/like/:videoId',verifyToken,like)
// dislike a video 
router.put('/dislike/:videoId',verifyToken,dislike)

 export default router;