@echo off
echo Installing dependencies...
echo This may take a few minutes on the first run as it needs to download a browser.
npm install
echo Running export script...
node export.js
echo.
echo Export script finished. Press any key to close this window.
pause
