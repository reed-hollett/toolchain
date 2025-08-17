# Toolchain

A collection of generative design tools by Reed Hollett.

## Local Development

To run this project on your local server:

### Option 1: Using npm scripts (recommended)
```bash
npm start
```
This will start a local server on port 3000 and automatically open your browser.

### Option 2: Using Python (if you have Python installed)
```bash
cd public
python -m http.server 3000
```

### Option 3: Using Node.js http-server directly
```bash
npx http-server public -p 3000 -o
```

## Project Structure

- `public/` - Static files for the web application
  - `index.html` - Main HTML file
  - `style.css` - Stylesheet
  - `script.js` - JavaScript functionality
  - `registry.json` - Tool registry data
- `vercel.json` - Vercel deployment configuration

## Features

The application displays a grid of generative design tools with:
- Tool names and descriptions
- Emoji icons
- Year and status badges
- Output type indicators
- Links to external tool URLs

Visit `http://localhost:3000` in your browser to view the application. 