# EduFind

EduFind is a full-stack college discovery platform built using Next.js, Node.js, PostgreSQL, and Prisma.

Users can search colleges, filter results, view college details, and compare colleges side by side.

## Features

- Search colleges
- Filter by state, type, and fees
- College detail page
- Compare up to 3 colleges
- Pagination support
- Responsive UI

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Prisma ORM

### Database
- PostgreSQL

---

## Project Structure

```bash
college-platform/

── backend/
── frontend/
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/college_platform"
```

Run migrations:

```bash
npm run db:migrate
```

Seed database:

```bash
npm run db:seed
```

Start backend server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:4000
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint |
|--------|----------|
| GET | /api/colleges |
| GET | /api/colleges/:id |
| GET | /api/colleges/filters |
| GET | /api/compare |

---

## Database

PostgreSQL is used as the database and Prisma is used as the ORM.

To open Prisma Studio:

```bash
npx prisma studio
```

---

## Author

Michael Nivah