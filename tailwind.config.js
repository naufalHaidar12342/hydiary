/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				viridian: "#478978",
				"blue-bell": "#8B95C9",
				"uranian-blue": "#ACD7EC",
				"columbia-blue": "#D6EDFF",
				"middle-blue-green": "#84DCC6",
			},
		},
	},
	plugins: [require("daisyui")],
};
