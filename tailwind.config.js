/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        libre: ["Dancing Script"],
        lilita: ["Lilita One"],
        pacifico: ["Pacifico"],
      },
    },
  },
  plugins: [require("daisyui")],
};
