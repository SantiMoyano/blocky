const withMT = require("@material-tailwind/react/utils/withMT");

//prettier-ignore
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Montserrat", "sans-serif"]
      }
    }
  }
});
