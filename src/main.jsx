import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"
import { Provider } from "react-redux"
import store from "./redux/store.js"
import { GoogleOAuthProvider } from "@react-oauth/google"

if (process.env.NODE_ENV === "production") {
  disableReactDevTools()
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="760088389479-l0814dmqkq4hlacel14npfrpfd60hpg6.apps.googleusercontent.com">

            <App />

        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
