import express from 'express';
import {signUp,signIn} from '../controllers/authController.js';
import asyncHandler from 'express-async-handler'
const router = express.Router();
// sign up
router.post('/signUp', signUp)
// sign in
router.post('/signIn', signIn)
// // google sign in
// router.post('/googleSignIn', googleSignIn)
// // sign out
// router.get('/signOut', signOut)




export default router;