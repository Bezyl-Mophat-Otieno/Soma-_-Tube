import  Comment  from '../models/Comment.js';
import Video from '../models/Video.js';
import { createError } from '../error.js';

export const addComment = async (req, res, next) => {

try {
    // The video id will be passed in the body of the comment request 
    const comment = await Comment.create({
        ...req.body,
        userId: req.user.id
    });
    const savedComment = await comment.save()
    res.status(201).json(comment);

    
} catch (error) {
    next(error)

    
}

}

export const deleteComment = async (req, res, next) => {

    try {

        //find the comment and Video using the req.params.id

        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(comment.videoId)

        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Comment deleted successfully")

        }else{
            next(createError(403,"You can only delete your comments"))
        }


        
    } catch (error) {
        next(error)
        
    }
    
    }

export const getComments = async (req, res, next) => {

        try {
            const comments =await  Comment.find({videoId:req.params.videoId})
            res.status(200).json(comments)
            
        } catch (error) {
        next(error)

            
        }
        
        }



