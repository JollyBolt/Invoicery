import { productSlice } from "./slices/productSlice";
import { customerSlice } from "./slices/customerSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    customers: customerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        //A custom middleware that detects if any non-serializable values have been included in state or dispatched actions. We add actions that have no serializable part in state to ingnoredActions
        ignoredActions: [
          "products/editProduct",
          "products/fetchSingleProduct",
          "products/postProduct",
          "products/deleteProduct",
          "customers/editCustomer",
          "customers/fetchSingleCustomer",
          "customers/postCustomer",
          "customers/deleteCustomer",
        ],
      },
    }),
});

export default store;
