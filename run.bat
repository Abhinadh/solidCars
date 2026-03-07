@echo off
echo Starting Solid Cars Website...

cd backend
start cmd /k "npm run start || node server.js"

cd ../frontend
start cmd /k "npm run dev"

echo Backend started on port 5000
echo Frontend starting...
