import type { Config } from "tailwindcss"
import flowbite from "flowbite-react/tailwind";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
        transitionProperty:{
          'spacing': 'margin, padding',
        },
        colors: {
          text: {
            dark: {
              base: "#9B9B9B",
              hover: "#E4E4E4",
            },
            light: {
              base:"#000000",
              hover: "#3F3F3F",
            },
          },
          bg: {
            light: {
              "1":"#E4E4E4",
              "2":"#f8f8f8",
              "page":'#FFFFFF'
              
            },
            dark: {
              "1":"#222222",
              "2":"#353535",
              "page":'#1a1a1a'
            },
          } ,
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    flowbite.plugin()
  ],
} satisfies Config

export default config