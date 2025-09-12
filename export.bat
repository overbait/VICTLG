@echo off
echo Installing dependencies...
npm install
echo Running export script...
node export.js
echo.
echo Export script finished. Press any key to close this window.
pause
