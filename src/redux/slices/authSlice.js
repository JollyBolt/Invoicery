import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
axios.defaults.withCredentials = true;


const login = createAsyncThunk("auth/login", async (body) => {
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

const signup = createAsyncThunk("auth/signup", async (body) => {
  try {
    console.log(body);
    const res = await axios.post(
      `http://localhost:4598/api/v1/auth/signup`,
      body,
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err);
  }
});



// const authenticationOfCookieOnPageReloadNOTRefreshTokenWithWarmRegardsIshanSen=

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    loggedIn: false,
    error: "",
  },
  reducers: {
    refreshAuth: (state) => {
      if (getCookieValue("authToken")) {
        state.loading = false;
        state.loggedIn = true;
        state.error = "";
      } else {
        state.loading = false;
        state.loggedIn = false;
        state.error = "";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.loggedIn = false;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.loggedIn = false;
      state.error = action.error.message;
    });
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.loggedIn = false;
      state.error = "";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.error = "";
      window.location.pathname='/'
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.loggedIn = false;
      state.error = action.error.message;
    });
  },
});

export { login, authSlice, signup };
