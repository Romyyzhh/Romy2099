import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class", "class"],
    theme: {
    	extend: {
    		colors: {
    			dark: {
    				DEFAULT: '#030005',
    				lighter: '#0F0518'
    			},
    			neon: {
    				purple: '#8B3DFF',
    				primary: '#B5179E',
    				magenta: '#F72585',
    				cyan: '#4CC9F0'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		fontFamily: {
    			sans: [
    				'var(--font-montserrat)',
    				'sans-serif'
    			],
    			display: [
    				'var(--font-montserrat)',
    				'sans-serif'
    			],
    			script: [
    				'var(--font-poppins)',
    				'cursive'
    			]
    		},
    		boxShadow: {
    			glow: '0 0 25px rgba(139, 61, 255, 0.7)',
    			'glow-magenta': '0 0 25px rgba(247, 37, 133, 0.7)',
    			'glow-lg': '0 0 50px rgba(181, 23, 158, 0.8)',
    			'glow-xl': '0 0 80px rgba(139, 61, 255, 0.9)'
    		},
    		animation: {
    			'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
    			'float': 'float 3s ease-in-out infinite'
    		},
    		keyframes: {
    			'glow-pulse': {
    				'0%, 100%': {
    					boxShadow: '0 0 20px rgba(123, 44, 191, 0.6)'
    				},
    				'50%': {
    					boxShadow: '0 0 40px rgba(157, 78, 221, 0.9)'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0px)'
    				},
    				'50%': {
    					transform: 'translateY(-20px)'
    				}
    			}
    		},
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    			'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #7B2CBF 0deg, #F72585 180deg, #7B2CBF 360deg)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
