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
        'slide-in': 'slide-in 0.3s ease-out forwards',
        'progress-bar': 'progress-bar linear forwards',
      },

      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(120%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'progress-bar': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      
    },
  },
  plugins: [],
}
