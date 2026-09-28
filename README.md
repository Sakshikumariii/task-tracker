# Daily Task Tracker

Small full-stack task app for learning **React** with **TypeScript**, **Redux Toolkit**, and a **Node + Express + MongoDB** API.

## Project layout

```
my-first-task/
├── backend/          # Express REST API
│   └── src/
│       ├── config/   # Database connection
│       ├── models/   # Mongoose Task schema
│       ├── routes/   # /api/tasks handlers
│       └── middleware/
└── frontend/         # Vite + React UI
    └── src/
        ├── app/      # Redux store + typed hooks
        ├── api/      # fetch wrappers
        ├── features/tasks/  # taskSlice + thunks
        ├── components/      # UI components
        ├── hooks/           # useEditTaskModal
        └── types/
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

## Backend setup

```powershell
cd backend
copy .env.example .env
npm install
npm run dev
```

API: `http://localhost:5000`  
Health: `GET /api/health`  
Tasks: `GET|POST /api/tasks`, `PUT|DELETE /api/tasks/:id`

## Frontend setup

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

UI: `http://localhost:5173`

Optional: set `VITE_API_URL` in `frontend/.env`. The Vite dev server also proxies `/api` to port 5000.

## Stage 1 (this step)

- Monorepo-style folders for backend and frontend
- MongoDB Task model and CRUD routes
- Redux store, async thunks, and API client
- Component folder structure wired in `App`

Next stages can refine UX, add tests, or deploy—tell me when you want to continue.
