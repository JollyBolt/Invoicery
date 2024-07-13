import { createSlice } from "@reduxjs/toolkit"

const system = window.matchMedia("(prefers-color-scheme:dark)")

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : system.matches
        ? "dark"
        : "light",
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light"
    },
  },
})

export { themeSlice }
