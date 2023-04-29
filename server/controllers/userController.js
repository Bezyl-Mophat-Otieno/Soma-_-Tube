import User from "../models/User.js"
import { createError } from "../error.js"
import Video from "../models/Video.js"
export const getUser =async (req,res,next) => {
        try {
            // finding the user and updating their info .
            const user = await User.findById(req.params.id)
            // sending the updated user to the client
            res.status(200).json(user)            
        } catch (error) {
            next(error)
        }
}

export const updateUser =async (req,res , next ) => {
    if(req.params.id === req.user.id){
        try {
            // finding the user and updating their info .
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            } , {new:true})
            // sending the updated user to the client
            res.status(200).json(updatedUser)            
        } catch (error) {
            next(error)
        }

    }else{
        return createError(403,"You can only update your account")
    }

}

export const deleteUser =async (req,res,next) => {

    if(req.params.id === req.user.id){
        try {
            // finding the user and deleting .
            await User.findByIdAndDelete(req.params.id)

            res.status(200).json("User deleted successfully")            
        } catch (error) {
            next(error)
        }

    }else{
        return createError(403,"You can only delete your account")
    }

}

export const subscribe =async (req,res , next) => {
    try {
        // find the signin user and add the subscription to the subscribedUsers array
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id}
        }) 
        // find subscribed to user and increment the subscription count by 1
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1}
        })
res.status(200).json("Subscription successfull")

        
    } catch (error) {
        
    }

    

}

export const unsubscribe =async (req,res,next) => {

    // find the signin user and remove the subscription from the subscribedUsers array
    await User.findByIdAndUpdate(req.user.id,{
        $pull:{subscribedUsers:req.params.id}
    })


// Decrement the uunsubscribed channel's list of subscribes
    await User.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:-1}
    })
    res.status(200).json("Unsubscription successfull")

}

export const like =async (req,res,next ) => {
    try {
    const userId = req.user.id
    const videoId = req.params.videoId

    await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:userId},
        $pull:{dislikes:userId}
    })
    res.status(200).json("Video liked successfully")
    } catch (error) {
        next(error)
        
    }

}

export const dislike = async (req,res , next) => {
    try {
        const userId = req.user.id
        const videoId = req.params.videoId
    
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:userId},
            $pull:{likes:userId}
        })
        res.status(200).json("Video disliked successfully")
        } catch (error) {
            next(error)
            
        }

}