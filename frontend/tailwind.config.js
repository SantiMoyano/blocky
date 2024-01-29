const withMT = require("@material-tailwind/react/utils/withMT");

//prettier-ignore
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Montserrat", "sans-serif"]
      },
      colors: {
        sky: {
          50: "#ffd97d",
          100: "#ffd97d",
          200: "#ffd97d",
          300: "#ffd97d",
          400: "#ffd97d",
          500: "#ffd97d",
          600: "#ffd97d",
          700: "#ffd97d",
          800: "#ffd97d",
          900: "#ffd97d"
        },
      },
    },
  }
});
