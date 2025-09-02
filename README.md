# Admin Auth

This project is a **Next.js 15** authentication and admin panel . It provides secure user authentication, registration, password reset, two-factor authentication (2FA), and role-based access control using **NextAuth.js**, **Prisma**, and **PostgreSQL**. The UI is built with Tailwind CSS and Radix UI.

## Features

- Email & Google OAuth login
- User registration & email verification
- Password reset via email
- Two-factor authentication (2FA) via email code
- Role-based access (Admin/User)
- User settings management
- Protected routes (server/client/admin)
- Modern UI with Tailwind CSS & Radix UI
- Error handling and feedback components

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [NextAuth.js](https://next-auth.js.org/) (v5)
- [Prisma](https://www.prisma.io/) ORM
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Zod](https://zod.dev/) validation

## Project Structure

- `app/` – Next.js app routes, layouts, and protected pages
- `components/` – UI and authentication components
- `actions/` – Server actions for authentication and user management
- `data/` – Database query helpers
- `lib/` – Utility functions, Prisma client, email service, token management
- `prisma/` – Prisma schema for database models
- `schemas/` – Zod validation schemas
- `hooks/` – Custom React hooks for user and role
- `public/` – Static assets

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
EMAIL_SERVER=smtp://user:pass@smtp.example.com:587
EMAIL_FROM=your@email.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Adjust values as needed for your environment.

## Step-by-Step Setup & Build Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/naid786/WebStore.git
cd WebStore/auth
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

- Copy `.env.example` to `.env` (if available) or create `.env` manually.
- Fill in your database, email, and OAuth credentials.

### 4. Set Up the Database

- Initialize the database and apply migrations:

```sh
npx prisma migrate dev --name init
```

- Generate Prisma client:

```sh
npx prisma generate
```

### 5. (Optional) Seed the Database

If you have a seed script, run:

```sh
npx prisma db seed
```

### 6. Run the Development Server

```sh
npm run dev
```

- The app will be available at [http://localhost:3000](http://localhost:3000)

### 7. Build for Production

```sh
npm run build
```

- To start the production server:

```sh
npm start
```

## Authentication Flow

- **Register:** Users sign up with email, name, and password. A verification email is sent.
- **Login:** Users log in with email/password or Google OAuth. If 2FA is enabled, a code is sent via email.
- **Password Reset:** Users can request a password reset email.
- **Role Management:** Admin-only routes and actions are protected by role checks.

## Folder Overview

- `app/` – Contains all Next.js routes, including protected admin/client/server pages and authentication pages.
- `components/` – UI elements (forms, buttons, modals, etc.) and authentication components.
- `actions/` – Server-side logic for login, registration, password reset, etc.
- `data/` – Database access helpers for users, tokens, etc.
- `lib/` – Shared utilities, Prisma client, email service, token generation.
- `prisma/` – Prisma schema (`schema.prisma`) for database models.
- `schemas/` – Zod schemas for form validation.
- `hooks/` – Custom React hooks for accessing current user and role.

## Useful Commands

- **Lint:**
  ```sh
  npm run lint
  ```
- **Format:**
  ```sh
  npm run format
  ```
- **Prisma Studio (DB UI):**
  ```sh
  npx prisma studio
  ```

## License

MIT

---

For questions or issues, please open an issue in this repository.
