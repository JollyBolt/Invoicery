import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
axios.defaults.withCredentials = true

const login = createAsyncThunk("auth/login", async (body, { getState }) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_URL}/api/v1/auth/login`,
      body,
    )
    console.log(getState())
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
  //Only to delete refresh token
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
)
// const authenticationOfCookieOnPageReloadNOTRefreshTokenWithWarmRegardsIshanSen=

const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (params, { getState, rejectWithValue }) => {
    try {
      const state = getState().auth
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/auth/checktoken`,
        {},
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        },
      )
      console.log(res.data.token)
      return res.data.token
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  },
)

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
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false
      state.token = action.payload.token
      state.error = ""
    })
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false
      state.token = null
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

    //Check Token
    builder.addCase(checkToken.pending, (state) => {
      state.loading = true
      state.error = ""
    })
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.loading = false
      state.token = action.payload
      state.error = ""
    })
    builder.addCase(checkToken.rejected, (state, action) => {
      state.loading = false
      state.token = null
      state.error = action.error.message
    })
  },
})

export { login, authSlice, signup, logout, checkToken }
