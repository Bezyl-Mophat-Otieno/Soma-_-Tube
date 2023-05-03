import User from "../models/User.js";
import asynHandler from 'express-async-handler'
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from 'jsonwebtoken'

// controller for sign up .
export const signUp = async(req,res , next)=>{
try {
    console.log("I am signing Up this is my request body " + req.body)
// generating the hash of the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
   // creating the user object that will be used for authentication
   const user = await User.create({
       ...req.body,password: hashedPassword
   })

  const savedUser = await user.save();
   console.log(savedUser)
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
   export  const signOut =async (req, res , next) => {
      await  res.clearCookie("access_token").send("User logged out successfully");
      next()

    }

    // controller for signing in with Google Cloud
export const  googleSignIn = async( req , res , next)=>{
    const user = await User.findOne({ email:req.body.email})

     try {


    if(user){

        // creating an access token to protect our user 
        const access_token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 })

        // sending the token to the user using cookies 
        res.cookie("access_token",access_token,{
            httpOnly:true,
        }).status(200).json(user._doc)
        console.log("Login successful")

  }else{

  // if user is not found we  create the user using the information from google.com
 const newUser = await User.create({
  ...req.body,fromGoogle:true
})

 const savedUser = await newUser.save();
      console.log(newUser)
        // creating an access token to protect our user 
        const access_token = jwt.sign({ id: savedUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })

        // sending the token to the user using cookies 
        res.cookie("access_token",access_token,{
            httpOnly:true,
        }).status(200).json(savedUser._doc)
        console.log("Login successful")
      return res.status(200).send("User created successfully");
  }
        
     } catch (error) {
        next(error);
        
     }

}


    