import type { Config } from "tailwindcss";
import './public/scss/main.scss';

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        libre: ["Plus Jakarta Sans"]
      }
    },
    colors: {
      'blue': 'var(--color-blue)',
      'blue-hover': 'var(--color-blue-hover)',
      'blue-100': 'var(--color-blue-light)',
      'blue-200' : 'var(--color-blue-light-2)',
      'blue-300' : 'var(--color-blue-light-3)',
      'sky' : 'var(--color-sky)',
      'red' : 'var(--color-red)',
      'green': 'var(--color-green)',
      'green-light': 'var(--color-green-light)',
      'red-light': 'var(--color-red-light)',
      'orange' : 'var(--color-orange)',
      'orange-100' : 'var(--color-orange-100)',
      'gray-light': 'var(--color-gray-light)',
      'gray-dark': 'var(--color-gray-dark)',
      'white' : 'var(--color-white)',
      'black' : 'var(--color-black)',
      'border' : 'var(--border-color)',
      'border-light' : 'var(--border-color-light)',
      'border-green' : 'var(--border-color-green)',
      'border-red' : 'var(--border-color-red)',
      'border-grey' : 'var(--border-color-grey)',
      'black-900' : 'var(--color-black-900)',
      'black-500' : 'var( --color-black-500)',
      'black-100' : 'var( --color-black-100)',
      'black-300' : 'var( --color-black-300)',
      'dark-blue' : 'var(--dark-blue)',
      'dark-gray' : 'var(--dark-gray)',
      'dark-gray-800' : 'var(--dark-gray-800)',
      'dark-gray-500' : 'var(--dark-gray-500)',
      'dark-gray-200' : 'var(--dark-gray-200)',
      'dark-gray-300' : 'var(--dark-gray-300)',
      'dark-gray-100' : 'var(--dark-gray-100)',
      'dark-gray-400' : 'var(--dark-gray-400)',
      'light-gray-100' : 'var(--light-gray-100)',
      'black-800' : 'var(--color-black-800)',
      'light-gray-200' : 'var(--light-gray-200)',
    },
    screens: {
      'sm': '576px',

      'md': '768px',

      'lg': '992px',

      'xl': '1200px',
      
      '2xl': '1536px',
    },
  },
  plugins: [],
  
};

export default config;
