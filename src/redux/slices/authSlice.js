import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
import getCookieValue from "../../utils/getCookieValue";

const login = createAsyncThunk("auth/login", async (payload) => {
  const res = await axios.post(
    `http://localhost:4598/api/v1/auth/login`,
    payload,
  );
  return res.data;
});

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
  },
});

export { login, authSlice };
