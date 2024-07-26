import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { authSlice } from "./authSlice"

axios.defaults.withCredentials = true
const { setToken } = authSlice.actions

const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async ({ search = "", page = 0, limit = 10 }, { dispatch, getState,rejectWithValue }) => {
    try {
      const state = getState().auth
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/product/getallproducts`,
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
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  },
)

const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, { dispatch, getState }) => {
    const state = getState().auth
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/product/getproduct/${id}`,
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

const postProduct = createAsyncThunk(
  "products/postProduct",
  async (product, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/product/createproduct`,
        product,
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

const editProduct = createAsyncThunk(
  "products/editProduct",
  async (params, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/v1/product/editproduct/${params.id}`,
        params.product,
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

const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { dispatch, getState }) => {
    try {
      const state = getState().auth
      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/api/v1/product/deleteproduct/${id}`,
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

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: true,
    products: [],
    error: "",
  },
  extraReducers: (builder) => {
    //Get All products
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false
      state.products = action.payload ? action.payload :[]
      state.error = ""
    })
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false
      state.products = []
      state.error = action.error.message
    })

    //Get Single product
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false
      state.products = action.payload
      state.error = ""
    })
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.loading = false
      state.products = []
      state.error = action.error.message
    })

    //Post product
    builder.addCase(postProduct.pending, (state) => {
      state.loading = true
    })
    builder.addCase(postProduct.fulfilled, (state, action) => {
      state.loading = false
      // state.products = action.payload;
      state.error = ""
    })
    builder.addCase(postProduct.rejected, (state, action) => {
      state.loading = false
      // state.products = [];
      state.error = action.error.message
    })

    //Edit product
    builder.addCase(editProduct.pending, (state) => {
      state.loading = true
    })
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.loading = false
      // state.products = action.payload;
      state.error = ""
    })
    builder.addCase(editProduct.rejected, (state, action) => {
      state.loading = false
      // state.products = [];
      state.error = action.error.message
    })

    //Delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false
      // state.products = action.payload;
      state.error = ""
    })
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false
      // state.products = [];
      state.error = action.error.message
    })
  },
})

export {
  productSlice,
  fetchAllProducts,
  fetchSingleProduct,
  postProduct,
  editProduct,
  deleteProduct,
}
