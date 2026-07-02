import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#6366F1",
          secondary: "#64748B",
          accent: "#8B5CF6"
        }
      }
    }
  },
  plugins: []
};

export default config;
