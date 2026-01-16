/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#135bec',
                'background-light': '#f6f6f8',
                'background-dark': '#101622',
            },
            fontFamily: {
                display: ['Manrope', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '0.25rem',
                lg: '0.5rem',
                xl: '0.75rem',
                full: '9999px',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
