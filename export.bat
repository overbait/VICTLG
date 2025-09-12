@echo off
SET "SCRIPT_DIR=%~dp0"
CD /D "%SCRIPT_DIR%"

echo Running npm install...
call npm install
IF %ERRORLEVEL% NEQ 0 (
    echo npm install failed. Exiting.
    pause
    EXIT /B %ERRORLEVEL%
)

echo Running export script...
call npm run export-pdf
IF %ERRORLEVEL% NEQ 0 (
    echo npm run export-pdf failed. Exiting.
    pause
    EXIT /B %ERRORLEVEL%
)

echo.
echo Export script finished. Press any key to close this window.
pause
