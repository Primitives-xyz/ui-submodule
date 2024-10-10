## Installation

To install the submodule, run the following command:

```bash
git submodule add https://github.com/Primitives-xyz/ui-submodule src/ui-submodule
```

### Install dependencies

```
yarn add tailwind-merge tailwindcss-important tailwindcss-animate class-variance-authority lucide-react
```

### Optional

```
yarn add zod swr framer-motion react-use-clipboard react-hook-form @hookform/resolvers @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-separator @radix-ui/react-select @radix-ui/react-tooltip @radix-ui/react-accordion @radix-ui/react-progress @radix-ui/react-alert-dialog @react-sigma/core graphology graphology-types @react-sigma/layout-forceatlas2 react-intersection-observer
```

## Usage

To use the package

# Import the css file into the main layout.tsx

```javascript
import 'src/ui-submodule/src/styles/styles.css'
```

# Import the tailwind config into the tailwind config file, enable tailwind for the submodule

```javascript
import tailwindDefaultConfig from './src/ui-submodule/src/tailwind.default.config'
...
const config: Config = {
  content: [
    ...
    './src/ui-submodule/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [tailwindDefaultConfig]
}
```

# Add ui-submodule to the tsconfig paths

```javascript
{
  "compilerOptions": {
    "paths": {
      "@ui/*": ["./src/ui-submodule/src/*"],
      "@/*": ["./src/*"]
    }
  },
}
```

# Define custom project colors and variables

```css
:root {
  /* Colors */
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;

  --muted: 210 40% 90%;
  --muted-foreground: 215.4 16.3% 46.9%;

  --card: 0 0% 96%;
  --card-foreground: 222.2 47.4% 11.2%;

  --popover: 0 0% 100%;
  --popover-foreground: 222.2 47.4% 11.2%;

  --border: 214.3 31.8% 91.4%;

  --input: var(--background);
  --input-foreground: var(--foreground);
  --input-border: var(--border);

  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;

  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;

  --destructive: 0 100% 50%;
  --destructive-foreground: 210 40% 98%;

  --ring: 215 20.2% 65.1%;

  /* Constants */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1.25rem;
  --radius-button: var(--radius-sm);
  --radius-input: var(--radius-sm);

  --shadow-sm: 0 2px 4px 0 rgba(58, 57, 57, 0.2);
  --shadow-md: 0 4.5px 4.5px 0 rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 8px 16px rgba(57, 65, 77, 0.1);

  --topbar-height: 3.5rem;
}
```

## Push to the submodule from the host

Navigate to the submodule folder, change the branch (if needed) of the submodule and the origin in order to push

```bash
git checkout main
git remote set-url origin git@github.com:Primitives-xyz/ui-submodule.git
```

Then git add commit push

## Update submodule in the host app

```bash
git submodule update --recursive --remote
```

Then commit and push the update
(might need to checkout the submodule branch to main, when the submodule is initialised it is stuck to a commit hash)

## After cloning the host repo, you need to initialised the submodule

```bash
git submodule init
git submodule update --recursive --remote
```
