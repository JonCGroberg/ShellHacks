/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {},
            keyframes: {
                'pop-up': {
                    '0%': {
                        transform: 'scale(0.4)', // Start smaller
                        opacity: '0', // Fully transparent
                    },
                    '100%': {
                        transform: 'scale(1)', // End at full size
                        opacity: '1', // Fully visible
                    },
                },
            },
            animation: {
                'pop-up': 'pop-up 0.5s ease-out forwards', // Pop-up animation with ease-out timing
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
