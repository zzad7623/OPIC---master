@echo off
title OPIc AI Master Launcher
chcp 65001 > nul
echo ========================================================
echo       OPIc AI Master 프로그램을 시작합니다...
echo ========================================================
echo.
cd /d "%~dp0"
python server.py
pause
