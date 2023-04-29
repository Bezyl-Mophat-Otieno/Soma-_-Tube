import User from "../models/User.js";
import asynHandler from 'express-async-handler'
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from 'jsonwebtoken'

// controller for sign up .
export const signUp = async(req,res , next)=>{
try {
// generating the hash of the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
   // creating the user object that will be used for authentication
   const user = await User.create({
       ...req.body,password: hashedPassword
   })

   await user.save();
   console.log(user)
   return res.status(200).send("User created successfully");

} catch (error) {
    next(error)   
}
}


// controller for signing in  .
export const signIn = async(req,res , next)=>{
    try {
        // find the user with the email provided
        const user = await User.findOne({email:req.body.email})
        if(!user) return createError(404,"User not Found ")


        // comparing the provided credentials and those stored in the db
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) return createError(400,"Invalid Credentials")

        // creating an access token to protect our user 
        const access_token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })

        // User password field shouldnot be sent to the user 
        const {password , ...others} = await user._doc

        // sending the token the user using cookies 
        res.cookie("access_token",access_token,{
            httpOnly:true,
        }).status(200).json(others)
        console.log("Login successful")
    
    } catch (error) {
        next(error)   
    }
    }

    // controller for signing out  .
   export  const signOut = (req, res) => {
        req.logout()
        res.clearCookie("access_token").send("Logged out")

    }

    