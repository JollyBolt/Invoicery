/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        primaryLight: "var(--primaryLight)",
      },
      borderRadius: {
        rounded: "var(--rounded)",
      },
      fontFamily:{
        numbers: ["Oswald"],
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
