# Build CSS
Write-Host "Building CSS..." -ForegroundColor Green

# Create the dist directory if it doesn't exist
if (-not (Test-Path -Path "dist/css")) {
    New-Item -Path "dist/css" -ItemType Directory -Force
}

# Combine CSS files
Write-Host "Combining CSS files..." -ForegroundColor Green

# Create a basic template for our CSS file
$headerComment = "/* Production CSS built on $(Get-Date) */`n/* Tailwind CSS */`n"
$fontImport = "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,/()%25-&display=swap');`n`n"
$bodyStyles = @"
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

"@

# Get custom CSS and append it
$customCss = Get-Content -Path "src/css/custom.css" -Raw

# Add animate-pulse-slow for coming soon page
$animatePulseCss = @"
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
"@

# Combine all CSS parts
$combinedCss = $headerComment + $fontImport + $bodyStyles + $customCss + "`n" + $animatePulseCss

# Write to output.css file
$combinedCss | Set-Content -Path "dist/css/output.css"

Write-Host "CSS build completed successfully!" -ForegroundColor Green
Write-Host "Output file: dist/css/output.css" -ForegroundColor Green
