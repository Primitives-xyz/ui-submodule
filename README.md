## Installation

To install the submodule, run the following command:

```bash
git submodule add git@github.com:Primitives-xyz/ui-submodule.git src/ui-submodule
```

## Usage

To use the package

# Import the css file into the main layout.tsx

```javascript
import 'src/ui-submodule/src/styles/styles.css'
```

# Import the tailwind config into the tailwind config file

```javascript
const config: Config = {
  presets: [require('./src/ui-submodule/src/tailwind.default.config.ts')]
}
```

# Add ui-submodule to the tsconfig paths

```javascript
{
  "compilerOptions": {
    "paths": {
      "ui": ["./src/ui-submodule/src"]
    }
  },
}
```

# Define custom project colors

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;

  --muted: 210 40% 90%;
  --muted-foreground: 215.4 16.3% 46.9%;

  --card: 0 0% 96%;
  --card-foreground: 222.2 47.4% 11.2%;

  --popover: 0 0% 100%;
  --popover-foreground: 222.2 47.4% 11.2%;

  --border: 214.3 31.8% 91.4%;

  --input: 214.3 31.8% 91.4%;

  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;

  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;

  --destructive: 0 100% 50%;
  --destructive-foreground: 210 40% 98%;

  --ring: 215 20.2% 65.1%;
}
```

## Update submodule in the host app

```bash
git submodule update --remote
```

Then commit and push the update

## Update submodule files from the host

Makes your changes
cd into the submodule
git commit
update the host app
