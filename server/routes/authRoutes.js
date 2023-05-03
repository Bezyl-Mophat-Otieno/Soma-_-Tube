import express from 'express';
import {signUp,signIn , googleSignIn , signOut} from '../controllers/authController.js';
import asyncHandler from 'express-async-handler'
const router = express.Router();
// sign up
router.post('/signUp', signUp)
// sign in
router.post('/signIn', signIn)
// google sign in
router.post('/google', googleSignIn)
// sign out
router.get('/signOut', signOut)




export default router;