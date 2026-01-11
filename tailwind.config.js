/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        // Add custom colors if needed, adhering to strict design system
      },
      animation: {
        "slide-horizontal": "slide-horizontal 30s linear infinite",
        marquee: "marquee 20s linear infinite",
        "music-bar-1": "music-bar-1 0.6s ease-in-out infinite",
        "music-bar-2": "music-bar-2 0.7s ease-in-out infinite",
        "music-bar-3": "music-bar-3 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
