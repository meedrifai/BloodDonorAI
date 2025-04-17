module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: {
          50: '#fcf2f2',
          100: '#f9d7d7',
          200: '#f5b7b1',
          300: '#e88a83',
          400: '#e74c3c', // Rouge sang principal
          500: '#d62c1a',
          600: '#b52a1c',
          700: '#88261b',
          800: '#5c1b14',
          900: '#32120d',
        },
        medical: {
          50: '#e9f5fc',
          100: '#cce7f5',
          200: '#9bd0ed',
          300: '#66b8e3',
          400: '#3498db', // Bleu médical principal
          500: '#217dbb',
          600: '#1a6396',
          700: '#164c74',
          800: '#0f3552',
          900: '#091e2f',
        },
        health: {
          50: '#e8f8f0',
          100: '#d1f0e0',
          200: '#a1e3c1',
          300: '#6bd69a',
          400: '#2ecc71', // Vert santé principal
          500: '#27ae60',
          600: '#1e8449',
          700: '#19703d',
          800: '#155d32',
          900: '#0e3e22',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}