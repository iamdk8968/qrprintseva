@echo off
title Building QR Print Seva Windows Agent (.exe)
echo ========================================================
echo    QR PRINT SEVA - 1-CLICK WINDOWS AGENT COMPILER
echo ========================================================
echo.

python -m pip install --upgrade pip pyinstaller
python build_exe.py

echo.
echo ========================================================
echo Output file is ready inside the "dist" folder:
echo dist\QR-Print-Seva-Agent.exe
echo ========================================================
pause
