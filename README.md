# Church Raffle Backend

## Description

Backend API for a church raffle system to manage 200 raffle numbers with reservation and purchase features.  
Implemented with Node.js, Express, Prisma ORM, PostgreSQL, and JWT authentication for admin users.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Database Setup](#database-setup)
- [Seeding Initial Data](#seeding-initial-data)
- [Create Admin User](#create-admin-user)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [CI/CD](#ci-cd)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Tech Stack

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Tokens)
- bcryptjs (password hashing)
- Jest & Supertest (testing)
- dotenv (environment variables)

---

## Installation and Setup

### 1. Clone or create project folder and enter it

```bash
mkdir church-raffle-backend
cd church-raffle-backend
```

````

### 2. Initialize Node.js project

```bash
npm init -y
```

### 3. Install dependencies

```bash
npm install express prisma @prisma/client jsonwebtoken bcryptjs cors dotenv
npm install --save-dev nodemon jest supertest
```

### 4. Initialize Prisma

```bash
npx prisma init
```

This creates the `prisma/` folder and `.env` file.

### 5. Configure PostgreSQL database

- Install PostgreSQL if you don't have it.
- Create database `raffle_db`:

```bash
psql -U your_postgres_user
CREATE DATABASE raffle_db;
\q
```

- Update `.env` with your DB connection string and JWT secret:

```env
DATABASE_URL="postgresql://your_postgres_user:your_password@localhost:5432/raffle_db?schema=public"
JWT_SECRET="your_jwt_secret_here"
```

### 6. Define Prisma schema

Replace `prisma/schema.prisma` with the project schema (see project files).

### 7. Run migrations and generate Prisma client

```bash
npx prisma migrate dev --name init
```

### 8. Seed initial data (200 raffle numbers)

Create `prisma/seed.js` with seed script, then run:

```bash
node prisma/seed.js
```

### 9. Create admin user (one-time)

Create `scripts/createAdmin.js` script, then run:

```bash
node scripts/createAdmin.js
```

### 10. Run development server

Add to `package.json` scripts:

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

Run with:

```bash
npm run dev
```

Server runs on [http://localhost:4000](http://localhost:4000)

---

## Database Setup with Docker (optional)

If you prefer Docker for PostgreSQL, run:

```bash
docker run --name raffle-postgres -e POSTGRES_USER=your_postgres_user -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=raffle_db -p 5432:5432 -d postgres
```

---

## API Endpoints Overview

- `GET /api/raffle/numbers` - Get list of raffle numbers and statuses.
- `POST /api/raffle/reserve` - Reserve numbers (body: numbers, name, email, phone).
- `POST /api/raffle/buy` - Buy numbers (body: numbers, name, email, phone).
- `POST /api/admin/login` - Admin login.
- `GET /api/admin/numbers` - Admin: Get all numbers.
- `PATCH /api/admin/numbers/:number` - Admin: Update number status.

---

## Folder Structure

```
/church-raffle-backend
│
├── prisma/
│   └── schema.prisma
│   └── seed.js
│
├── scripts/
│   └── createAdmin.js
│
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── tests/
│
├── .env
├── package.json
└── README.md
```

---

## Testing

Testing setup with Jest and Supertest will be implemented to cover API endpoints, admin login, reservations, and purchases.

---

## CI/CD

Instructions for CI/CD pipelines and deploy steps will be added.

---

## License

MIT License
````
