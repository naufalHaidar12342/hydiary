/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	prefix: "",
	theme: {
		container: {},
		extend: {
			colors: {
				"darkblue-gradient": "#12184E",
				"dark-gradient": "#0A0B1A12",
				sand: "#E4E0D5",
				"purple-gradient": "#6D6DCF00",
			},
		},
	},
	plugins: [nextui()],
};
