/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Purple gradient world (background shell)
        violet: {
          950: "#1e0a4e", // deepest indigo, bottom-right of gradient
          900: "#2e1065",
          800: "#4c1d95",
          700: "#6d28d9",
          600: "#7c3aed",
          500: "#8b5cf6",
        },
        magenta: "#b01fd4", // top-left glow of the brand gradient
        // Yellow — spent only on CTAs and key highlights
        amber: {
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
        },
        // Light "paper" surfaces floating on the dark gradient
        paper: "#faf8ff",
        ink: "#231038",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ["Figtree", "system-ui", "sans-serif"],
      },
      keyframes: {
        streak: {
          "0%": { transform: "translate(-8%, -8%)" },
          "50%": { transform: "translate(8%, 8%)" },
          "100%": { transform: "translate(-8%, -8%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        streak: "streak 24s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
