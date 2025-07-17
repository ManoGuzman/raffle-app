#!/bin/bash
# Setup Frontend React + Vite + Tailwind CSS (actualizado)
set -e

echo "Creating Vite React project..."
npm create vite@latest ../client -- --template react

cd ../client || exit

echo "Installing dependencies..."
npm install

echo "Installing Tailwind CSS and PostCSS plugins..."
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss

echo "Initializing Tailwind config..."
npx tailwindcss init -p

# Overwrite postcss.config.cjs with correct plugin config
cat > postcss.config.cjs <<EOL
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
EOL

echo "Updating tailwind.config.js with content paths..."
cat > tailwind.config.js <<EOL
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
EOL

echo "Creating src/index.css with Tailwind directives..."
mkdir -p src
cat > src/index.css <<EOL
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

echo "Setup complete! You can now run 'npm run dev' inside the 'client' folder."
