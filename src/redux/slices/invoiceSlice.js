import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import getCookieValue from "../../utils/getCookieValue";
import axios from "axios";
axios.defaults.withCredentials = true

const createInvoice = createAsyncThunk("invoice/createInvoice", async (body) => {
    try {
      const res = await axios.post(
        `http://localhost:4598/api/v1/auth/login`,
        body,
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  });

  const deleteInvoice=createAsyncThunk("invoice/deleteInvoice",async(id)=>{
    
  } 

// export {}