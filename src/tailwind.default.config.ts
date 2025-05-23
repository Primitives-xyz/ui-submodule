import scrollbarHide from 'tailwind-scrollbar-hide'
import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  content: [],
  theme: {
    borderRadius: {
      DEFAULT: 'var(--radius-md)',
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      button: 'var(--radius-button)',
      input: 'var(--radius-input)',
      card: 'var(--radius-card)',
      'popover-card': 'var(--radius-popover-card)',
      tabs: 'var(--radius-tabs)',
      full: '9999px',
      none: '0px',
    },
    extend: {
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        card: 'var(--shadow-card)',
        toolkit: 'var(--shadow-toolkit)',
        'card-sm': 'var(--shadow-card-sm)',
      },
      height: {
        topbar: 'var(--topbar-height)',
        'screen-minus-topbar': 'calc(100vh - var(--topbar-height))',
      },
      spacing: {
        topbar: 'var(--topbar-height)',
      },
      aspectRatio: {
        '2/3': '2/3',
        '3/2': '3/2',
      },
      colors: {
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        input: {
          DEFAULT: 'hsl(var(--input))',
          foreground: 'hsl(var(--input-foreground))',
          border: 'hsl(var(--input-border))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary))',
          foreground: 'hsl(var(--tertiary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        modal: {
          DEFAULT: 'hsl(var(--modal))',
          foreground: 'hsl(var(--modal-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        progress: {
          DEFAULT: 'hsl(var(--progress))',
          foreground: 'hsl(var(--progress-foreground))',
        },
        switch: {
          DEFAULT: 'hsl(var(--switch))',
          foreground: 'hsl(var(--switch-foreground))',
          checked: {
            DEFAULT: 'hsl(var(--switch-checked))',
            foreground: 'hsl(var(--switch-checked-foreground))',
          },
        },
        tab: {
          DEFAULT: 'hsl(var(--tab))',
          foreground: 'hsl(var(--tab-foreground))',
          active: {
            DEFAULT: 'hsl(var(--tab-active))',
            foreground: 'hsl(var(--tab-active-foreground))',
          },
        },
      },
      borderColor: {
        DEFAULT: 'hsl(var(--border))',
      },
      keyframes: {
        'infinite-scroll-content': {
          '0%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '100%': {
            transform: 'translate3d(-100%, 0, 0)',
          },
        },
      },
      animation: {
        'infinite-scroll-content': 'infinite-scroll-content 7s linear infinite',
      },
    },
  },
  plugins: [scrollbarHide, animate],
  darkMode: 'class',
}

export default config
