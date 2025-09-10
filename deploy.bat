@echo off
echo 🚀 Deploying Mustafa's Epic Portfolio to GitHub Pages...
echo.

echo ✅ Step 1: Building the project...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed!
    exit /b 1
)

echo ✅ Step 2: Deploying to GitHub Pages...
call npx gh-pages -d dist
if errorlevel 1 (
    echo ❌ Deployment failed!
    exit /b 1
)

echo.
echo 🎉 SUCCESS! Your portfolio has been deployed!
echo 🌐 It will be available at: https://YOUR_USERNAME.github.io/mustafa-portfolio/
echo.
echo 📝 Next steps:
echo 1. Go to https://github.com/YOUR_USERNAME/mustafa-portfolio
echo 2. Go to Settings → Pages
echo 3. Set source to "gh-pages" branch
echo 4. Your site will be live in a few minutes!
echo.
pause
