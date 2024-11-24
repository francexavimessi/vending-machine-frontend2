/** @type {import('tailwindcss').Config} */
module.exports = {
  // add config tailwind with mui
  // corePlugins: {
  //   preflight: false,
  // },
  //
  // important: "#root",
  darkMode: ["class"],
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      fontFamily: {
        seogoeUi: ["var(--font-seogoe-ui)"],
      },
      fontWeight: {
        seogoeUiLight: "300",
        seogoeUiNormal: "400",
        seogoeUiSemiBold: "600",
        seogoeUiBold: "700",
      },
      fontStyle: {
        seogoeUiLight: "light",
        seogoeUiNormal: "normal",
        seogoeUiItalic: "italic",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // my config

        // login
        blueLoginText: "#016299",
        blueHoverLoginButton: "#0057BF",
        organgeForgotPassword: "#F2643C",
        // sidebar
        blueText: "#024F7B",
        blueHamburger: "#8CC7E1",
        blueSidebar: "#E9ECF2",
        hoverBlueSidebar: "#E1EEFF",
        activeSidebar: "#E4F0FF",
        buttonHoverBlue: "#ECF2FF",
        blueHintChangePassword: "rgba(211, 218, 253, 0.54)",
        activeSubSideBar: "#F5F9FE",
        blueLine: "#D1D8FD",

        // button
        buttonblueBase: "#0082CC",
        buttonblueAddNew: "#B2E4E3",
        buttonTextNavy: "#041942",
        // table
        blueTableHeader: "#BAE0F9",

        // text
        textNavyBase: "#041942",
        textOrangeBase: "#FF4D1B",

        // search ui
        blueSearchHeader: "#C3DCFD",
        blueSearchBorder: "#ACC4E4",

        // table ui
        blueTableColumn: "#E5EFFB",
        blueTableRow: "#F2F8FF",

        // upload button
        buttonUploadText: "#0991DE",

        // subMenuPage
        greySubMenuPage:"#F4F4F5",
        greyHoverSubMenuPage:"#E4E4E5",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("flowbite/plugin")],
};
