
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Fluent 2 Color System
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Fluent 2 Brand Colors
				fluent: {
					blue: {
						10: '#061724',
						20: '#082338',
						30: '#0a2e4a',
						40: '#0c3b5e',
						50: '#0e4775',
						60: '#0f548c',
						70: '#115ea3',
						80: '#0f6cbd',
						90: '#2886de',
						100: '#479ef5',
						110: '#62abf5',
						120: '#77b7f7',
						130: '#96c6fa',
						140: '#b4d6fa',
						150: '#cfe4fa',
						160: '#ebf3fc'
					},
					grey: {
						4: '#fafafa',
						6: '#f7f7f7',
						8: '#f5f5f5',
						10: '#f0f0f0',
						12: '#ebebeb',
						14: '#e8e8e8',
						16: '#e0e0e0',
						18: '#d6d6d6',
						20: '#cccccc',
						22: '#c7c7c7',
						24: '#c1c1c1',
						26: '#bababa',
						28: '#b3b3b3',
						30: '#adadad',
						32: '#a6a6a6',
						34: '#9e9e9e',
						36: '#979797',
						38: '#8f8f8f',
						40: '#878787',
						42: '#808080',
						44: '#787878',
						46: '#707070',
						48: '#696969',
						50: '#616161',
						52: '#595959',
						54: '#525252',
						56: '#4a4a4a',
						58: '#424242',
						60: '#3b3b3b',
						62: '#333333',
						64: '#2e2e2e',
						66: '#292929',
						68: '#242424',
						70: '#1f1f1f',
						72: '#1a1a1a',
						74: '#141414',
						76: '#0f0f0f',
						78: '#0a0a0a',
						80: '#050505',
						82: '#000000'
					},
					neutral: {
						foreground: {
							rest: '#242424',
							hover: '#424242',
							pressed: '#424242',
							disabled: '#bfbfbf'
						},
						background: {
							canvas: '#fafafa',
							layer: '#ffffff',
							layerAlt: '#f7f7f7'
						},
						stroke: {
							accessible: '#616161',
							focus: '#242424',
							disabled: '#e0e0e0'
						}
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				// Fluent 2 border radius
				'fluent-sm': '2px',
				'fluent-md': '4px',
				'fluent-lg': '8px',
				'fluent-xl': '12px'
			},
			fontFamily: {
				// Fluent 2 Typography
				'fluent': ['Segoe UI', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
			},
			fontSize: {
				// Fluent 2 Type Scale
				'fluent-caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
				'fluent-body': ['14px', { lineHeight: '20px', fontWeight: '400' }],
				'fluent-body-strong': ['14px', { lineHeight: '20px', fontWeight: '600' }],
				'fluent-subtitle': ['20px', { lineHeight: '28px', fontWeight: '600' }],
				'fluent-title': ['28px', { lineHeight: '36px', fontWeight: '600' }],
				'fluent-large-title': ['40px', { lineHeight: '52px', fontWeight: '600' }],
				'fluent-display': ['68px', { lineHeight: '92px', fontWeight: '600' }]
			},
			spacing: {
				// Fluent 2 Spacing Scale
				'fluent-xs': '2px',
				'fluent-s': '4px',
				'fluent-m': '8px',
				'fluent-l': '12px',
				'fluent-xl': '16px',
				'fluent-xxl': '20px',
				'fluent-xxxl': '24px'
			},
			boxShadow: {
				// Fluent 2 Elevation
				'fluent-2': '0px 1px 2px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
				'fluent-4': '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
				'fluent-8': '0px 4px 8px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
				'fluent-16': '0px 8px 16px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
				'fluent-64': '0px 32px 64px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.20)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
