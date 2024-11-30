import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#3D806E",
        secondary: "#63BFAE",
        tertiary: "#99D9C9",
        accent: "#03392B",
        highlight: "#F2F2F2",
        obsidian: "#040615",
      },
      fontFamily: {
        poppins: "var(--font-poppins)",
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(80% 50% at 50% -20%, var(--primary-color), var(--obsidian))'
      }
    },
  },
  plugins: [],
} satisfies Config;
