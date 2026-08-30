/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    // Tokens mirror src/styles/tokens.css. The CSS variables are the source of
    // truth so runtime theming stays possible; these map them into utilities.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: "var(--ink)",
      paper: "var(--paper)",
      text: "var(--text)",
      "text-muted": "var(--text-muted)",
      "surface-1": "var(--surface-1)",
      "surface-2": "var(--surface-2)",
      hairline: "var(--hairline)",
      recess: "var(--recess)",
      chrome: "var(--chrome)",
      // Flag states: /see-it-work walkthrough only, only for state indication.
      "flag-blocks": "var(--flag-blocks)",
      "flag-look": "var(--flag-look)",
      "flag-clean": "var(--flag-clean)",
      "flag-blocks-wash": "var(--flag-blocks-wash)",
      "flag-look-wash": "var(--flag-look-wash)",
    },
    fontFamily: {
      sans: "var(--font)",
    },
    extend: {
      fontSize: {
        // role, [size, { lineHeight, letterSpacing, fontWeight }]
        hero: [
          "clamp(2.6rem, 7vw, 6rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
        spine: [
          "clamp(2.5rem, 8vw, 7rem)",
          { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
        h2: [
          "clamp(1.75rem, 4vw, 3rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        lead: [
          "clamp(1.125rem, 1.6vw, 1.375rem)",
          { lineHeight: "1.5", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        body: [
          "1.0625rem",
          { lineHeight: "1.55", letterSpacing: "0", fontWeight: "400" },
        ],
        caption: [
          "0.8125rem",
          { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" },
        ],
      },
      transitionTimingFunction: {
        "out-brand": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-brand": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      maxWidth: {
        prose: "34rem",
        measure: "44rem",
      },
    },
  },
  plugins: [],
};
