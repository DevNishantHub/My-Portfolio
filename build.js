// build.js - Cross-platform build script for CSS and preparing for Vercel deployment
const fs = require('fs');
const path = require('path');

console.log('Building project for deployment...');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist', 'css');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('Created dist/css directory');
}

// Read the custom CSS file
let customCssPath = path.join(__dirname, 'src', 'css', 'custom.css');
let customCss = '';
if (fs.existsSync(customCssPath)) {
  customCss = fs.readFileSync(customCssPath, 'utf8');
  console.log('Read custom.css file');
}

// Create the combined CSS content
const combinedCss = `/* Production CSS built on ${new Date().toISOString()} */
/* Tailwind CSS */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,/()%25-&display=swap');

/* Base styles */
body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    scroll-behavior: smooth;
    padding-top: 4rem; /* Add padding to account for fixed navbar */
}

/* Smooth scrolling for all anchors */
html {
    scroll-behavior: smooth;
    /* Font size adjustment for better responsive typography */
    font-size: 100%;
}

@media (max-width: 640px) {
    html {
        font-size: 90%;
    }
}

${customCss}

/* Animate pulse slow - for coming soon page */
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}
.animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`;

// Write the output file
const outputPath = path.join(distDir, 'output.css');
fs.writeFileSync(outputPath, combinedCss);
console.log(`CSS build completed successfully! Output: ${outputPath}`);
