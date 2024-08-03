import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,scss}",
    flowbite.content(),
  ],
  theme: {
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
  },
  },
  plugins: [
    flowbite.plugin()
  ],
};
export default config;
