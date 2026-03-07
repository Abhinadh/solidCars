# Solid Cars - Premium Second-Hand Car Dealership

A modern, responsive MERN stack application for a second-hand car dealership.

## Tech Stack
- **Frontend**: React (Vite), TailwindCSS, Framer Motion, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB + Mongoose, JWT Auth, Multer

## Project Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on standard port (27017)

### Installation
Run the following commands individually to install dependencies if not already done.

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

### Running the App
The easiest way on Windows is to double click the `run.bat` file in the root directory.

Alternatively, you can run them manually:

1. **Start Backend**:
```bash
cd backend
node server.js
```

2. **Start Frontend**:
```bash
cd frontend
npm run dev
```

### Admin Access
- **URL**: `http://localhost:5173/admin`
- **Username**: `admin`
- **Password**: `admin123`

*(Note: Data has been pre-seeded using `node seeder.js` in the backend folder)*
