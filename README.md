# EV Charging App

## Tech Stack
- Frontend: React 19 + Vite + React Router
- Backend: Node.js + Express + Mongoose (MongoDB)

## Prerequisites
- Node.js (18+)
- MongoDB (local service or Atlas)

## Setup & Run
1. Install dependencies:
   ```
   npm install
   ```
2. Start MongoDB service (Windows: MongoDB as Windows Service) or use MongoDB Atlas.
3. Run development server (starts both frontend & backend):
   ```
   npm run dev
   ```
   - Backend: http://localhost:5000
   - Frontend: http://localhost:5173 (Vite default)

## Scripts
- `npm run dev` - Concurrent frontend/backend dev servers
- `npm run server` - Backend only
- `npm run build` - Build frontend
- `npm run lint` - Lint code

## Features
- User Signup/Login
- Station listing, payments, etc.

If MongoDB connection fails, install MongoDB Community Server from mongodb.com and start the service.

