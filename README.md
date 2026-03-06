# CineLog — Personal Film Tracker

A full-stack movie watchlist app built with **Vite + React** and **Node.js + Express**.

This codebase contains **10 bugs** of varying difficulty. Find and fix them all.

---

## Getting Started

### Requirements
- Node.js v18+

### 1 — Start the backend

```bash
cd backend
npm install
npm run dev
```

Runs at **http://localhost:3001**

### 2 — Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at **http://localhost:5173**

---

## Features

- View all films with status (Queued / Watching / Watched)
- Filter by status, sort by title / year / rating / date added
- Sidebar with stats (totals, average rating, genres)
- Add new films via modal form
- Mark films as watched + add a star rating
- Edit personal notes on any film
- Remove films from the list

---

## Your Task

Find and fix all **10 bugs**.

For each one, document:
1. **File and line number**
2. **Symptom** — what goes wrong in the UI or API
3. **Root cause** — why the code is incorrect
4. **Fix** — your corrected code

### Tips

- Run the app and observe what's broken
- Open the browser console for JavaScript errors
- Use the Network tab to inspect API requests
- Test every feature: add, filter, sort, mark watched, save notes, delete
- Some bugs are silent — they don't throw errors, they just produce wrong behavior

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite 5 |
| Hooks | useState, useEffect, useCallback |
| Backend | Node.js + Express 4 |
| HTTP | fetch API |

## Structure

```
cinelog/
├── backend/
│   └── server.js
└── frontend/
    └── src/
        ├── App.jsx
        ├── api/moviesApi.js
        ├── hooks/useMovies.js
        └── components/
            ├── MovieGrid.jsx
            ├── MovieCard.jsx
            ├── StatsPanel.jsx
            └── AddMovieForm.jsx
```

Good luck. 🎬
