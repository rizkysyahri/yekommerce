import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        padding: "384px",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
      spacing: {
        "2/3": "66.666667%",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/aspect-ratio")],
  daisyui: {
    themes: ["cupcake"],
  },
} satisfies Config;
