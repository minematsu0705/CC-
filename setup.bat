@echo off
setlocal
chcp 65001 > nul

echo [STATUS] Checking for Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js (npm) is not installed!
    echo [ACTION] Attempting to install Node.js via winget...
    
    winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
    
    if %errorlevel% neq 0 (
        echo [FAIL] Winget installation failed.
        echo Please install Node.js manually: https://nodejs.org/
        pause
        exit /b 1
    )
    
    echo.
    echo =======================================================
    echo [SUCCESS] Node.js has been installed.
    echo.
    echo IMPORTANT: You must RESTART your terminal or VS Code
    echo for the changes to take effect.
    echo.
    echo After restarting, please run this script again or run:
    echo   npm install
    echo =======================================================
    pause
    exit /b 0
)

echo [SUCCESS] Node.js is available.
echo.
echo [ACTION] Installing dependencies...
call npm install

echo.
echo [ACTION] Installing specific packages (@sveltejs/adapter-vercel, ai, @google/generative-ai)...
call npm install @sveltejs/adapter-vercel ai @google/generative-ai

if %errorlevel% neq 0 (
    echo [FAIL] Error during npm install.
    pause
    exit /b 1
)

echo.
echo [DONE] Setup completed successfully!
pause
