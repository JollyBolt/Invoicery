import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const forgotPassword=createAsyncThunk('user/login',async(body)=>{

// }

const userSlice=createSlice({
    name:'user',
    initialState:{
        loading:true,
        loggedIn:false,
        error:''
    },
})