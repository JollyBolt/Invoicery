import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
axios.defaults.withCredentials = true

const fetchAllCustomers = createAsyncThunk(
  "customers/fetchAllCustomers",
  async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users")
    return res.data.map((customer) => customer) //return value of each callback of map is added to an array which is finally returned by the map function
  },
)

const fetchSingleCustomer = createAsyncThunk(
  "customers/fetchSingleCustomer",
  async (id) => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    )
    return res.data
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
  async (customer) => {
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${customer.id}`,
      customer,
    )
    return res.data
  },
)

const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id) => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    )
    return res.data
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
