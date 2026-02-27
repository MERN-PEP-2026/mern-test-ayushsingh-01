# Student Course Management System (MVP)

Built a full-stack Student Course Management System using MERN stack with JWT authentication and RESTful APIs, supporting dynamic course creation and management.

## MVP Features

- Student register/login
- Create course
- View all courses
- Delete course
- React frontend connected to Node/Express backend

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- Frontend: React, React Router, Axios, Vite

## Project Structure

```
mern-test-ayushsingh-01/
	backend/
	frontend/
	README.md
```

## Backend API

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Courses (JWT Protected)
- `POST /api/courses`
- `GET /api/courses`
- `DELETE /api/courses/:id`

## Setup Instructions

### 1) Backend

```bash
cd backend
cp .env.example .env
```

Update `.env` values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student_course_mvp
JWT_SECRET=your_super_secret_key
```

Install and run:

```bash
npm install
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on Vite dev server and calls backend at `http://localhost:5000/api`.

## MVP Checklist

### Backend
- [x] Models created (`Student`, `Course`)
- [x] Auth working (`register`, `login`)
- [x] Course APIs working (`create`, `read`, `delete`)

### Frontend
- [x] Register page works
- [x] Login page works
- [x] Dashboard loads courses
- [x] Can create course
- [x] Can delete course

### Integration
- [x] JWT stored in `localStorage`
- [x] Token attached in `Authorization` header
- [x] Protected route for dashboard