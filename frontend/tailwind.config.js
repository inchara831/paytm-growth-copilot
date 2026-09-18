/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paytm: {
          navy: '#002970',
          blue: '#002e6e',
          lightBlue: '#00b9f1',
          sky: '#e6f7fc',
          accent: '#0083ca',
          dark: '#0a192f',
          surface: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        card: '0 1px 4px 0 rgba(0, 0, 0, 0.06)',
        elevated: '0 4px 12px 0 rgba(0, 41, 112, 0.08)',
      },
    },
  },
  plugins: [],
}
