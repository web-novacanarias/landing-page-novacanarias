/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					primary: '#00236a', // azul marca
					secondary: '#f8fafc', // Gris muy claro/blanco roto
					accent: '#64748b',   // Gris para detalles
				}
			},
			fontFamily: {
				sans: ['FuturaStd', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
};