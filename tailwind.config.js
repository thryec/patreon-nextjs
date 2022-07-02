module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Montserrat", "san-serif"],
        header: ["Messapia", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        midnight: "#1b2536",
      },
    },
  },
  plugins: [],
};
