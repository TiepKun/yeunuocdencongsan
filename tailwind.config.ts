import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#080b10",
        ink: "#101723",
        brass: "#c99a4a",
        bronze: "#8b5a2b",
        ember: "#9f2f2b",
        ivory: "#f4ead7"
      },
      boxShadow: {
        museum: "0 24px 80px rgba(0, 0, 0, 0.42)"
      }
    }
  },
  plugins: []
};

export default config;
