import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import getCookieValue from "../../utils/getCookieValue";
import axios from "axios";

const createInvoice = createAsyncThunk("invoice/create", async (body) => {
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

// export {}