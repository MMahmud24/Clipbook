/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#EDE8E0',
        navy: '#060A15',
        blue: {
          DEFAULT: '#2563EB',
          mid: '#3B82F6',
          pale: '#EFF6FF',
        },
      },
    },
  },
  plugins: [],
}
