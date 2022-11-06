module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "easel-darky": "#393939",
        "easel-balge-light": "#FAD6A5",
        "easel-sage-dark": "#61764B",
        "easel-sage-light": "#9BA17B",
        "easel-balge-dark":  "#CFB997",
        "easel-light": "#EEEEEE",
        "easel-pink": "#FFE1E1"
      }
    },
  },
  plugins: [],
  mode: "jit"
}