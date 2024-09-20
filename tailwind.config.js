const daisyui = require("daisyui");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        shadcn: {
          primary: "hsl(var(--primary))",
          secondary: "hsl(var(--secondary))",
        },
      },
      "dark",
    ],
  },
};
