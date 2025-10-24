/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sansation: ['"Sansation"', 'sans-serif'],
        baloo: ['"Baloo Chettan 2"', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
