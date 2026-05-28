/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        dark: {
          900: '#050505',
          800: '#0a0a0a',
          700: '#141414',
          600: '#1a1a1a',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#F3E5AB',
          400: '#E5C158',
          500: '#D4AF37',
          600: '#AA8C2C',
          700: '#806921',
        },
        cream: {
          100: '#FFFDD0',
          200: '#F5F5DC',
        }
      },
      letterSpacing: {
        'widest-xl': '0.25em',
      }
    },
  },
  plugins: [],
}
