/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
	theme: {
		extend: {
			colors: {
				"goh-blue": "#0062a3",
			},
			gridTemplateColumns: {
				"3cols": "auto auto auto",
			},
			spacing: {
				128: "32rem",
			},
		},
	},
};
