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
				
				section: {
					header: 'hsl(var(--section-header))',
					'header-foreground': 'hsl(var(--section-header-foreground))'
				},
				
				action: {
					gol: 'hsl(var(--action-gol))',
					'gol-contra': 'hsl(var(--action-gol-contra))',
					'corn-favor': 'hsl(var(--action-corn-favor))',
					'corn-contra': 'hsl(var(--action-corn-contra))',
					'pnlti-favor': 'hsl(var(--action-pnlti-favor))',
					'pnlti-contra': 'hsl(var(--action-pnlti-contra))',
					anotaciones: 'hsl(var(--action-anotaciones))'
				},
				
				quick: {
					ganado: 'hsl(var(--quick-ganado))',
					puerta: 'hsl(var(--quick-puerta))',
					recuper: 'hsl(var(--quick-recuper))',
					perdido: 'hsl(var(--quick-perdido))',
					fuera: 'hsl(var(--quick-fuera))',
					'perdido-ball': 'hsl(var(--quick-perdido-ball))',
					'falta-favor': 'hsl(var(--quick-falta-favor))',
					'falta-contra': 'hsl(var(--quick-falta-contra))',
					parada: 'hsl(var(--quick-parada))'
				},
				
				timer: {
					bg: 'hsl(var(--timer-bg))',
					text: 'hsl(var(--timer-text))',
					iniciar: 'hsl(var(--timer-iniciar))',
					pausar: 'hsl(var(--timer-pausar))',
					reiniciar: 'hsl(var(--timer-reiniciar))'
				},
				
				team: {
					cd: 'hsl(var(--team-cd))',
					equipo: 'hsl(var(--team-equipo))'
				},
				
				player: {
					bg: 'hsl(var(--player-bg))',
					border: 'hsl(var(--player-border))',
					text: 'hsl(var(--player-text))'
				},
				
				parte: {
					bg: 'hsl(var(--parte-bg))',
					text: 'hsl(var(--parte-text))'
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
