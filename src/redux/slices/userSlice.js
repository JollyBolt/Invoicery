import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import getCookieValue from "../../utils/getCookieValue"
axios.defaults.withCredentials = true

// const forgotPassword=createAsyncThunk('user/login',async(body)=>{

// }

const getProfile = createAsyncThunk("user/getProfile", async () => {
  try {
    const res = await axios.get("http://localhost:4598/api/v1/user/getUser", {
      headers: {
        Authorization: "Bearer " + getCookieValue("authToken"),
      },
    })
    console.log(res.data)
    return res.data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err)
  }
})

const editProfile = createAsyncThunk("user/editProfile", async (body) => {
  try {
    const res = await axios.put(
      "http://localhost:4598/api/v1/user/updateUser",
      body,
      {
        headers: {
          Authorization: "Bearer " + getCookieValue("authToken"),
        },
      },
    )
    console.log(res.data)
    return res.data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err)
  }
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    user: {},
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
      state.error = ""
    })
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false
      state.user = {}
      state.error = action.error.message
    })
  },
})

export { getProfile, editProfile, userSlice }
