export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f766e",
        secondary: "#f59e0b",
        surface: "#f8fafc"
      },
      boxShadow: {
        soft: "0 14px 35px rgba(15, 118, 110, 0.08)"
      }
    }
  },
  plugins: []
};
