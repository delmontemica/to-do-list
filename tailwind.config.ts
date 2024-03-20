import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          0: "#576371",
          1: "#D1D0D9",
          3: "#BCBCBC",
          4: "#A9A9A9",
          5: "#9796A8",
        },
        blue: {
          0: "#526F92",
          1: "#60C6FF"
        },
        light: {
          0: "#F5F5F5",
        },
        dark: {
          0: "#2E2E2E",
        },
      },
      fontSize: {
        "3xl": "28px",
      },
    },
  },
  plugins: [],
};
export default config;
