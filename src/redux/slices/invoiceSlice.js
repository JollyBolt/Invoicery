import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import getCookieValue from "../../utils/getCookieValue"
import axios from "axios"
import { authSlice } from "./authSlice"

axios.defaults.withCredentials = true
const { setToken } = authSlice.actions

const fetchAllInvoices = createAsyncThunk(
  "invoice/fetchAllInvoices",
  async ({ search = "", page = 0, limit = 10 }, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/invoice/getallinvoices`,
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
      return res.data.data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  },
)

const fetchSingleInvoice = createAsyncThunk(
  "invoice/fetchSingleInvoice",
  async (id, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/invoice/getinvoice/${id}`,
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        },
      )
      dispatch(setToken(res.data.token))
      return res.data.data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  },
)

const createInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async (body, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/invoice/createinvoice`,
        body,
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        },
      )
      dispatch(setToken(res.data.token))
      return res.data.data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  },
)

const editInvoice = createAsyncThunk(
  "invoice/editInvoice",
  async (params, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/v1/invoice/editinvoice/${params.id}`,
        params.body,
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        },
      )
      dispatch(setToken(res.data.token))
      return res.data.data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  },
)

const deleteInvoice = createAsyncThunk(
  "invoice/deleteInvoice",
  async (id, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/api/v1/invoice/deleteinvoice/${id}`,
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        },
      )
      dispatch(setToken(res.data.token))
      return res.data.data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  },
)

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
      // state.invoices = action.payload
      state.error = ""
    })
    builder.addCase(createInvoice.rejected, (state, action) => {
      state.loading = false
      // state.invoices = []
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
    builder.addCase(deleteInvoice.rejected, (state, action) => {
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
