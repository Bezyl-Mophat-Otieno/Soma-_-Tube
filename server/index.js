import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import videoRoutes from './routes/videoRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'

//TODO install {jsonwebtoken , cookie-perser}
dotenv.config()
const app = express()
const PORT = 5000
// creating a connection to the database
const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected')
        // start the server if connection to database is successful
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
// Calling the database connection function
connectDB()

// Creating an error handling middleware
app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "Something went wrong"
    return res.status(status).json({
        success: false, status: status, message: message
    })

})
// Configuring the app to use cookies 
app.use(cookieParser())

// Configuring our server to accept json data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initializing router midleware and the url endpoints
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/comments', commentRoutes)



