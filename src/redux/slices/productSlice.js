import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookieValue from "../../utils/getCookieValue";
axios.defaults.withCredentials = true;

const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      // console.log(getCookieValue('authToken'));
      const res = await axios.get(
        "http://localhost:4598/api/v1/product/getallproducts",
        {
          headers: {
            Authorization: "Bearer " + getCookieValue("authToken"),
          },
        },
      );
      return res.data; //return value of each callback of map is added to an array which is finally returned by the map function
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id) => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    return res.data;
  },
);

const postProduct = createAsyncThunk(
  "products/postProduct",
  async (product) => {
    try {
      const res = await axios.post(
        "http://localhost:4598/api/v1/product/createproduct",
        product,
        {
          headers: {
            Authorization: "Bearer" + getCookieValue("authToken"),
          },
        },
      );
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  },
);

const editProduct = createAsyncThunk(
  "products/editProduct",
  async (product) => {
    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${product.id}`,
        product,
      );
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  },
);

const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
  try {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    return res.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue(e);
  }
});

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
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });

    //Get Single product
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });

    //Post product
    builder.addCase(postProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postProduct.fulfilled, (state, action) => {
      state.loading = false;
      // state.products = action.payload;
      state.error = "";
    });
    builder.addCase(postProduct.rejected, (state, action) => {
      state.loading = false;
      // state.products = [];
      state.error = action.error.message;
    });
    //Edit product
    builder.addCase(editProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.loading = false;
      // state.products = action.payload;
      state.error = "";
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.loading = false;
      // state.products = [];
      state.error = action.error.message;
    });

    //Delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      // state.products = action.payload;
      state.error = "";
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      // state.products = [];
      state.error = action.error.message;
    });
  },
});

export {
  productSlice,
  fetchAllProducts,
  fetchSingleProduct,
  postProduct,
  editProduct,
  deleteProduct,
};
