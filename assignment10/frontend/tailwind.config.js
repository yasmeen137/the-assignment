/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#f59e0b',
        'neon-green': '#32ff7e',
        'bright-orange': '#ff9f1a',
        'light-gray': '#d3d3d3',
        'bright-blue': '#0abde3',
        'blue-700': '#0056b3',
      },
    },
  },
  plugins: [],
};
