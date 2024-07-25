import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
axios.defaults.withCredentials = true

const login = createAsyncThunk("auth/login", async (body) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_URL}/api/v1/auth/login`,
      body,
    )
    return res.data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err)
  }
})

const signup = createAsyncThunk("auth/signup", async (body) => {
  try {
    console.log(body)
    const res = await axios.post(
      `${import.meta.env.VITE_URL}/api/v1/auth/signup`,
      body,
    )
    return res.data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err)
  }
})

const logout = createAsyncThunk(
  "auth/logout",
  async (params, { getState }) => {
    try {
      const state = getState().auth
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/auth/logout`,
        {},
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        },
      )
      console.log(res.data)
      return res.data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  },
  //Only to delete refresh token
)
// const authenticationOfCookieOnPageReloadNOTRefreshTokenWithWarmRegardsIshanSen=

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,

    token: undefined,
    error: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    deleteToken: (state) => {
      state.token = null
    },
  },
  //Login
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true

      state.error = ""
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false

      state.token = action.payload
      state.error = ""
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false

      state.token = null
      state.error = action.error.message
    })

    //Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true

      state.error = ""
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false

      state.token = action.payload.token
      state.error = ""
      window.location.pathname = "/"
    })
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false

      state.error = action.error.message
    })

    //Logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true
      state.error = ""
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false
      state.error = ""
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export { login, authSlice, signup, logout }
