//TODO: install @reduxjs/toolkit and react-redux
import {createSlice } from '@reduxjs/toolkit';


const initialState = {
    loading :false,
    currentVideo:null,
    error:false
}

export const videoSlice = createSlice({
    name:"video",
    initialState,
    reducers:{
        videoStart : (state)=>{
            state.loading = true
           
        },
        videoSuccess:(state,action)=>{
            state.currentUser = action.payload
            state.loading = false

        },
        videoFailure:(state)=>{
            state.loading = false
            state.error=true

        },
    
    }

    } 
    
)

// export the reducer functions 

export const { videoStart , videoSuccess , videoFailure } =  videoSlice.actions

// export the reducer 

export default videoSlice.reducer