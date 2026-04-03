# Tailwind

sudo npm install -D tailwindcss postcss autoprefixer
sudo npx tailwindcss init -p

```javascript
//tailwind.config.js
content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
//index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

//import css file in main.tsx or index.jsx


//config .prettierrc

{
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": false,
    "singleQuote": true,
    "jsxsingleQuote": true,
    "printWidth": 120,
    "plugins": ["prettier-plugin-tailwindcss"]
}


// RAILS
1. add tailwindcss-rails
2. rails tailwindcss:install
3. ./bin/dev
```
