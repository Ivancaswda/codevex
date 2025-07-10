import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#000000", // Абсолютно черный
				foreground: "#00FF00", // Ярко-зеленый

				card: {
					DEFAULT: "#0a0f0a", // Темно-зеленый черный
					foreground: "#00ff9d", // Мятно-зеленый
				},
				popover: {
					DEFAULT: "#0f0f0f",
					foreground: "#2aff2a",
				},
				primary: {
					DEFAULT: "#00ff00", // щсновной зеленый
					foreground: "#000000",
				},
				secondary: {
					DEFAULT: "#004400", // глубокий зеленый
					foreground: "#ccffcc",
				},
				muted: {
					DEFAULT: "#1a1a1a", // тёмный серо-зелёный
					foreground: "#77ff77",
				},
				accent: {
					DEFAULT: "#00cc66",
					foreground: "#001f0f",
				},
				destructive: {
					DEFAULT: "#ff0033", // ярко-красный
					foreground: "#ffffff",
				},

				border: "#003300",
				input: "#001a00",
				ring: "#00ff00",

				chart: {
					"1": "#00ff00",
					"2": "#66ff66",
					"3": "#99ff99",
					"4": "#ccffcc",
					"5": "#004400",
				},
			},
			borderRadius: {
				lg: "0.75rem",
				md: "0.5rem",
				sm: "0.25rem",
			},
		},
	},
	plugins: [],
} satisfies Config;
