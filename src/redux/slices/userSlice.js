import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import getCookieValue from "../../utils/getCookieValue"
import { authSlice } from "./authSlice"
axios.defaults.withCredentials = true
const { setToken } = authSlice.actions

const getProfile = createAsyncThunk("user/getProfile", async (params, { dispatch, getState }) => {
  try {
    const state = getState().auth
    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/user/getUser`,
      {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      },
    )
    dispatch(setToken(res.data.token))
    console.log(res.data)
    return res.data.data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err)
  }
})

const editProfile = createAsyncThunk("user/editProfile", async (body, { dispatch, getState }) => {
  try {
    const state = getState().auth
    const res = await axios.put(
      `${import.meta.env.VITE_URL}/api/v1/user/updateUser/${body._id}`,
      body,
      {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      },
    )
    dispatch(setToken(res.data.token))
    console.log(res.data)
    return res.data.data
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
    //Get Profile
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

    //Edit Profile
    builder.addCase(editProfile.pending, (state) => {
      state.loading = true
    })
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.loading = false
      // state.user = action.payload
      state.error = ""
    })
    builder.addCase(editProfile.rejected, (state, action) => {
      state.loading = false
      // state.user = {}
      state.error = action.error.message
    })
  },
})

export { getProfile, editProfile, userSlice }
