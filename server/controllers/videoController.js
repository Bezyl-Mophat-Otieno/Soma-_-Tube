import Video from '../models/Video.js'
import User from '../models/User.js'
import { createError } from '../error.js'

// add a video to the database
export const addVideo =async ( req , res , next)=>{
    try {
        // creating a new video
        const newVideo = await  Video.create({
            userId:req.user.id, ...req.body
        })
        // saving the video to the database
        await newVideo.save()
        // sending the saved video to the client
        res.status(200).json("video saved successfully")
        
    } catch (error) {
        next(error)
    }


}


export const getVideo =async ( req , res , next)=>{
    try {
        const video= await Video.findById(req.params.id)
        res.status(200).json(video)
        
    } catch (error) {
        next(error)
    }

    
}
// deletes a video from

export const deleteVideo =async ( req , res , next)=>{


    try {
        // find the video
        const video = Video.findById(req.params.id)
        if(!video) return createError(404,"Video not found")

        if(video.userId === req.user.id){
            // delete the video
            await Video.findByIdAndDelete(req.params.id)
            // send the deleted video to the client
            res.status(200).json("Video deleted successfully")

        }else{
            return createError(403,"You can only delete your videos")
        }
        
    } catch (error) {
        
    }

    
}
// update a video
export const updateVideo =async ( req , res , next)=>{

    try {
        // find the video
        const video = Video.findById(req.params.id)
        if(!video) return createError(404,"Video not found")

        if(video.userId === req.user.id){
            // update the video
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            // send the updated video to the client
            res.status(200).json(updatedVideo)

        }else{
            return createError(403,"You can only update your videos")
        }
        
    } catch (error) {
        
    }
}
// inccrement the views of a video
export const addViews =async ( req , res , next)=>{


    try {

        await Video.findByIdAndUpdate(req.params.id,{
        $inc:{views:1}
        })
        res.status(200).json("View added successfully")
        
    } catch (error) {
        next(error);
    }

    
}

// generate a list of trending videos

export const trendingVideos =async ( req , res , next)=>{
    
    try {

        const trendingVideos = await Video.find().sort({views:-1}).limit(40)
        res.status(200).json(trendingVideos)
        
    } catch (error) {
        next(error)
        
    }

    
}

export const randomVideos =async ( req , res , next)=>{
    try {
         const videos = await Video.aggregate([{ $sample: { size: 40 } }])
         res.status(200).json(videos)
    } catch (error) {
        next(error)
        
    }

    
}

export const videoSubscribedTo =async ( req , res , next)=>{
    try {
    const user = await User.findById(req.user.id)
    const subscribedChannels = user.subscribedUsers

    // create a list of all the videos of the subscribed channels

    const list =await Promise.all(subscribedChannels.map(async channelId=>{

        return await  Video.find({userId:channelId})
    }))
    // use javascript flat method to flatten the list and sort it by date
    res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt))
    } catch (error) {
        next(error)
        
    }

    
}

// find by Tags 

export const findByTag = async (req,res,next)=>{

    const tags = req.params.tags.split(',');
    try {
        const videos =await Video.find({tags:{$in:tags}}).limit(20)
        res.status(200).json(videos)
        
    } catch (error) {
        next(error)
    }


}


//search  for a video based on the title

export const search = async (req,res,next)=>{

    const query = req.query.q
    try {
        const videos =await Video.find({title:{$regex:query,$option:"i" }}).limit(40)
        res.status(200).json(videos)
        
    } catch (error) {
        next(error)
    }


}

