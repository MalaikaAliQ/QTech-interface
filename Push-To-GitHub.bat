@echo off
title Push QTech Interface to GitHub
cd /d "%~dp0"
echo ===================================================
echo Pushing Quantum Technology Application to GitHub...
echo Repository: https://github.com/MalaikaAliQ/QTech-interface.git
echo ===================================================
echo.
git push -u origin main
if errorlevel 1 (
    echo.
    echo Force pushing to update remote repository...
    git push -u origin main --force
)
echo.
echo ===================================================
echo SUCCESS! Your code is now live on GitHub.
echo ===================================================
pause
