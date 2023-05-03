//TODO: install @reduxjs/toolkit and react-redux
import {createSlice } from '@reduxjs/toolkit';


const initialState = {
    loading :false,
    currentUser:null,
    error:false
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginStart : (state)=>{
            state.loading = true
           
        },
        loginSuccess:(state,action)=>{
            state.currentUser = action.payload
            state.loading = false

        },
        loginFailure:(state)=>{
            state.loading = false
            state.error=true

        },
        logout:(state)=>{
            state.currentUser = null

          
        },
        subscription : (state, action) => {

            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                  state.currentUser.subscribedUsers.findIndex(
                    (channelId) => channelId === action.payload
                  ),1)
        }else{
            state.currentUser.subscribedUsers.push(action.payload)
        }
    
    },

    } 
    
})

// export the reducer functions 

export const { loginStart , loginSuccess , loginFailure , logout , subscription} =  userSlice.actions

// export the reducer 

export default userSlice.reducer