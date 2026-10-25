@echo off
title QR Print Seva - Windows Print Agent Launcher
echo ========================================================
echo    QR PRINT SEVA - WINDOWS DESKTOP PRINT AGENT
echo ========================================================
echo.
echo Starting agent...
python qrprintseva_agent.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [NOTE] Python is not installed or not in PATH.
    echo Please install Python 3.8 or higher from https://python.org
    echo or run dist\QR-Print-Seva-Agent.exe
    pause
)
