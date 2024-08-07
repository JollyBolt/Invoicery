import { configureStore } from "@reduxjs/toolkit"
import { productSlice } from "./slices/productSlice"
import { customerSlice } from "./slices/customerSlice"
import { invoiceSlice } from "./slices/invoiceSlice"
import { userSlice } from "./slices/userSlice"
import { authSlice } from "./slices/authSlice"
import { themeSlice } from "./slices/themeSlice"

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productSlice.reducer,
    customers: customerSlice.reducer,
    user: userSlice.reducer,
    invoices: invoiceSlice.reducer,
    theme: themeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        //A custom middleware that detects if any non-serializable values have been included in state or dispatched actions. We add actions that have no serializable part in state to ingnoredActions
        ignoredActions: [
          "auth/login",
          "auth/signup",
          "auth/setToken",
          "auth/checkToken",
          "auth/logout",
          "auth/deleteToken",
          "theme/toggleTheme",
          "user/getProfile",
          "user/editProfile",
          "products/editProduct",
          "products/fetchSingleProduct",
          "products/postProduct",
          "products/deleteProduct",
          "customers/editCustomer",
          "customers/fetchSingleCustomer",
          "customers/postCustomer",
          "customers/deleteCustomer",
          "invoices/fetchSingleInvoice",
          "invoices/createInvoice",
          "invoices/editInvoice",
          "invoices/deleteInvoice",
        ],
      },
    }),
})

export default store
