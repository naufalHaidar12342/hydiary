/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				viridian: "#478978",
				"blue-bell": "#8B95C9",
				"uranian-blue": "#ACD7EC",
				"columbia-blue": "#D6EDFF",
				"middle-blue-green": "#84DCC6",
				"github-dark": "#30363D",
				"brave-dark": "#303443",
				"deep-aquamarine": "#478978",
				oxley: "#6B8F77",
				"moss-green": "#7D9856",
				"jelly-bean-blue": "#4B848F",
				glaucous: "#6585B0",
				"jet-stream": "#B6D0C8",
				"cambridge-blue": "#95B7AD",
				"amazon-green": "#367564",
				"dark-slate-gray": "#256152",
			},
		},
	},
	plugins: [require("daisyui")],
};
