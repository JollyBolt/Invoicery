import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import getCookieValue from "../../utils/getCookieValue"
import axios from "axios"
import { authSlice } from "./authSlice"

axios.defaults.withCredentials = true
const { setToken } = authSlice.actions

const fetchAllCustomers = createAsyncThunk(
  "customers/fetchAllCustomers",
  async ({ search = "", page = 0, limit = 10 }, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/customer/getallcustomers`,
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
          params: {
            search: search,
            page: page,
            limit: limit,
          },
        },
      )
      dispatch(setToken(res.data.token))
      console.log(res.data)
      return res.data.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  },
)

const fetchSingleCustomer = createAsyncThunk(
  "customers/fetchSingleCustomer",
  async (id, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/customer/getcustomer`,
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
          params: {
            id: id,
          },
        },
      )
      dispatch(setToken(res.data.token))
      console.log(res.data.token)
      return res.data.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  },
)

const postCustomer = createAsyncThunk(
  "customers/postCustomer",
  async (customer, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/customer/createcustomer`,
        customer,
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        },
      )
      dispatch(setToken(res.data.token))
      console.log(res.data)
      return res.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  },
)

const editCustomer = createAsyncThunk(
  "customers/editCustomer",
  async (params, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/v1/customer/editcustomer/${params.id}`,
        params.customer,
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        },
      )
      dispatch(setToken(res.data.token))
      console.log(res.data)
      return res.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  },
)

const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/api/v1/customer/deletecustomer/${id}`,
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        },
      )
      dispatch(setToken(res.data.token))
      return res.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  },
)

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    loading: true,
    customers: [],
    error: "",
  },
  extraReducers: (builder) => {
    //Get All Customers
    builder.addCase(fetchAllCustomers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchAllCustomers.fulfilled, (state, action) => {
      state.loading = false
      state.customers = action.payload
      state.error = ""
    })
    builder.addCase(fetchAllCustomers.rejected, (state, action) => {
      state.loading = false
      state.customers = []
      state.error = action.error.message
    })

    //Get Single customer
    builder.addCase(fetchSingleCustomer.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchSingleCustomer.fulfilled, (state, action) => {
      state.loading = false
      state.customers = action.payload
      state.error = ""
    })
    builder.addCase(fetchSingleCustomer.rejected, (state, action) => {
      state.loading = false
      state.customers = []
      state.error = action.error.message
    })

    //Post Customer
    builder.addCase(postCustomer.pending, (state) => {
      state.loading = true
    })
    builder.addCase(postCustomer.fulfilled, (state, action) => {
      state.loading = false
      // state.customers = action.payload;
      state.error = ""
    })
    builder.addCase(postCustomer.rejected, (state, action) => {
      state.loading = false
      // state.customers = [];
      state.error = action.error.message

      //Edit Customer
      builder.addCase(editCustomer.pending, (state) => {
        state.loading = true
      })
      builder.addCase(editCustomer.fulfilled, (state, action) => {
        state.loading = false
        // state.customers = action.payload;
        state.error = ""
      })
      builder.addCase(editCustomer.rejected, (state, action) => {
        state.loading = false
        // state.customers = [];
        state.error = action.error.message
      })

      //Delete Customer
      builder.addCase(deleteCustomer.pending, (state) => {
        state.loading = true
      })
      builder.addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false
        // state.customers = action.payload;
        state.error = ""
      })
      builder.addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false
        // state.customers = [];
        state.error = action.error.message
      })
    })
  },
})

export {
  customerSlice,
  fetchAllCustomers,
  fetchSingleCustomer,
  postCustomer,
  editCustomer,
  deleteCustomer,
}
