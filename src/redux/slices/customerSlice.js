import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import getCookieValue from "../../utils/getCookieValue"
import axios from "axios"
axios.defaults.withCredentials = true

const fetchAllCustomers = createAsyncThunk(
  "customers/fetchAllCustomers",
  async ({ search = "", page = 0, limit = 10 }) => {
    try {
      const res = await axios.get(
        "http://localhost:4598/api/v1/customer/getallcustomers",
        {
          headers: {
            Authorization: "Bearer " + getCookieValue("authToken"),
          },
          params: {
            search: search,
            page: page,
            limit: limit,
          },
        },
      )

      return res.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  },
)

const fetchSingleCustomer = createAsyncThunk(
  "customers/fetchSingleCustomer",
  async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:4598/api/v1/customer/getcustomer`,
        {
          headers: {
            Authorization: "Bearer " + getCookieValue("authToken"),
          },
          params:{
            id: id,
          }
        },
      )
      return res.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  },
)

const postCustomer = createAsyncThunk(
  "customers/postCustomer",
  async (customer) => {
    const res = await axios.post(
      "http://localhost:4598/api/v1/customer/createcustomer",
      customer,
      {
        headers: {
          Authorization: "Bearer " + getCookieValue("authToken"),
        },
      },
    )
    console.log(res.data)
    return res.data
  },
)

const editCustomer = createAsyncThunk(
  "customers/editCustomer",
  async (params) => {
    try {
      const res = await axios.put(
        `http://localhost:4598/api/v1/customer/editcustomer/${params.id}`,
        params.customer,
        {
          headers: {
            Authorization: "Bearer " + getCookieValue("authToken"),
          },
        },
      )
      return res.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  },
)

const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4598/api/v1/customer/deletecustomer/${id}`,
        {
          headers: {
            Authorization: "Bearer " + getCookieValue("authToken"),
          },
        },
      )
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
