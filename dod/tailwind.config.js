/** @type {import('tailwindcss').Config} */
export default {
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
				104: "26rem",
				// 112: "28rem",
				// 128: "32rem",
				160: "40rem",
			},
		},
	},
};
