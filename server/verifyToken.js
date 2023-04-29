import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req,res,next) =>{

    const token = req.cookies.access_token;
    if(!token) return createError(401,"You are not Authenticated")
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return createError(403,"Invalid Token")
        req.user = user
        next()
    })


}