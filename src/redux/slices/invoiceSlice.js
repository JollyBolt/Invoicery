import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import getCookieValue from "../../utils/getCookieValue"
import axios from "axios"
axios.defaults.withCredentials = true

const fetchAllInvoices = createAsyncThunk(
  "invoice/fetchAllInvoices",
  async ({ search = "", page = 0, limit = 10 }) => {
    try {
      const res = await axios.get(
        `http://localhost:4598/api/v1/invoice/getallinvoices`,
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
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  },
)

const fetchSingleInvoice = createAsyncThunk(
  "invoice/fetchSingleInvoice",
  async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:4598/api/v1/invoice/getinvoice/${id}`,
        {
          headers: {
            Authorization: "Bearer " + getCookieValue("authToken"),
          },
        },
      )
      return res.data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  },
)

const createInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async (body) => {
    try {
      const res = await axios.post(
        `http://localhost:4598/api/v1/invoice/createinvoice`,
        body,
        {
          headers: {
            Authorization: "Bearer " + getCookieValue("authToken"),
          },
        },
      )
      return res.data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  },
)

const editInvoice = createAsyncThunk("invoice/editInvoice", async (params) => {
  try {
    const res = await axios.put(
      `http://localhost:4598/api/v1/invoice/editinvoice/${params.id}`,
      params.body,
      {
        headers: {
          Authorization: "Bearer " + getCookieValue("authToken"),
        },
      },
    )
    return res.data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err)
  }
})

const deleteInvoice = createAsyncThunk("invoice/deleteInvoice", async (id) => {
  try {
    const res = await axios.delete(
      `http://localhost:4598/api/v1/invoice/deleteinvoice/${id}`,
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
})

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    loading: true,
    invoices: [],
    error: "",
  },
  extraReducers: (builder) => {
    //Get All Invoices
    builder.addCase(fetchAllInvoices.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchAllInvoices.fulfilled, (state, action) => {
      state.loading = false
      state.invoices = action.payload
      state.error = ""
    })
    builder.addCase(fetchAllInvoices.rejected, (state, action) => {
      state.loading = false
      state.invoices = []
      state.error = action.error.message
    })

    //Get Single Invoice
    builder.addCase(fetchSingleInvoice.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchSingleInvoice.fulfilled, (state, action) => {
      state.loading = false
      state.invoices = action.payload
      state.error = ""
    })
    builder.addCase(fetchSingleInvoice.rejected, (state, action) => {
      state.loading = false
      state.invoices = []
      state.error = action.error.message
    })

    //Create Invoice
    builder.addCase(createInvoice.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      state.loading = false
      state.invoices = action.payload
      state.error = ""
    })
    builder.addCase(createInvoice.rejected, (state, action) => {
      state.loading = false
      state.invoices = []
      state.error = action.error.message
    })

    //Edit Invoice
    builder.addCase(editInvoice.pending, (state) => {
      state.loading = true
    })
    builder.addCase(editInvoice.fulfilled, (state, action) => {
      state.loading = false
      // state.invoices = action.payload
      state.error = ""
    })
    builder.addCase(editInvoice.rejected, (state, action) => {
      state.loading = false
      // state.invoices = []
      state.error = action.error.message
    })

    //Delete Invoice
    builder.addCase(deleteInvoice.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteInvoice.fulfilled, (state, action) => {
      state.loading = false
      // state.invoices = state.invoices.filter((invoice) => invoice._id!== action.payload)
      state.error = ""
    })
    builder.addCase(deleteInvoice.rejected, (state,action)=>{
      state.loading = false
      // state.invoices = []
      state.error = action.error.message
    })
  },
})

export {
  invoiceSlice,
  createInvoice,
  editInvoice,
  deleteInvoice,
  fetchAllInvoices,
  fetchSingleInvoice,
}
