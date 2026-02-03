# Career Trigger Server

**Career Trigger Server** is a scalable, high-performance backend system engineered for a career-focused community platform. Built with **Node.js**, **Express**, **TypeScript** and **Mongoose** this project emphasizes strict architectural patterns to ensure maintainability, security, and scalability.

It features a complete content management system with **Role-Based Access Control (RBAC)**, allowing distinct privileges for Admins, Editors, and Users.

---

## 🏛️ Engineering & Architecture

This project moves beyond a standard MVC setup, implementing a **Modular Layered Architecture**. Each domain (User, Post, Auth) is encapsulated, ensuring separation of concerns.

### Design Principles & Patterns Applied

- **Layered Architecture:** strict separation between the **Transport Layer** (Routers/Controllers), **Business Logic Layer** (Services), and **Data Access Layer** (Models).
- **SOLID Principles:**
    - _SRP:_ Each file has a single responsibility (e.g., Controllers only handle HTTP requests, Services handle logic).
    - _Dependency Injection:_ Services are decoupled to allow for easier testing and refactoring.
- **Singleton Pattern:** Utilized for Database Connections and Configuration management to ensure efficient resource usage.
- **DRY (Don't Repeat Yourself):** Reusable `AppError` classes, `catchAsync` wrappers, and global middlewares reduce code redundancy.
- **KISS & YAGNI:** The codebase avoids over-engineering, focusing on clean, readable solutions that solve the immediate business requirements without unnecessary complexity.

---

### Development Tools

-- Linting: ESLint configuration included
-- Formatting: Prettier configuration included
-- Type Checking: TypeScript with tsconfig.json
-- Validation: Zod or Joi schemas for request validation

---

## 📂 Project Structure

The project follows a **Feature-Based Modular Structure**, making it easy to navigate and scale:

```text
careertrigger-backend/
│
├─ src/
│   ├─ app.ts                  # express app
│   ├─ server.ts               # server startup
│   │
│   ├─ config/                 # db configuration
│   │   ├─ index.ts
│   │
│   ├─ middlewares/
│   │   ├─ auth.ts             # jwt logic
│   │   ├─ notFound.ts         # route not founds logic
│   │   └─ globalErrorHandler.ts
│   │
│   ├─ modules/                # modules
│   │   │
│   │   ├─ auth/               # auth logics
│   │   ├─ users/              # user managements
│   │   ├─ posts/              # post managements
│   │   ├─ categories/         # category hierarchy
│   │
│   ├─ routes/                 # core api routers
│   ├─ utils/                  # utility function (SendResponse, CatchAsync)
│   └─ interfaces/             # global types definitions
│
└─ package.json
```

# 🛡️ Role-Based Access Control (RBAC)

Security is paramount. The system implements **granular permissions**:

| Role                   | Access Level    | Responsibilities                                                                          |
| ---------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| **Admin**              | Root Access     | Manage all users, assign roles, view system-wide stats, and manage all content/categories |
| **Editor / Moderator** | Elevated Access | Create, update, and delete posts. Can change post status (e.g., Publish/Archive)          |
| **User**               | Standard        | Create personal posts, comment on discussions, and react to content                       |

---

# 🚀 API Endpoints Overview

All routes are prefixed with **`/api/v1`** (configurable).

## 🔐 Authentication

- `POST /auth/register` : Register a new user
- `POST /auth/login` : Secure login (Returns Access & Refresh Token)
- `POST /auth/refresh` : Generate a new Access Token using Refresh Token

## 📝 Post Management

- `GET /posts` : Retrieve all posts (Paginated)
- `GET /posts/id/:id` : Retrieve a single post details
- `POST /posts/create` : Create a new post (**Auth Required**)
- `PUT /posts/update/:id` : Update content (**Author/Admin**)
- `PATCH /posts/update-post-status/:id` : Update publication status (**Admin/Editor**)
- `DELETE /posts/delete/:id` : Remove a post (**Admin/Author**)

## 📁 Categories

- `GET /categories` : Get all categories
- `POST /categories/create-cat` : Create new category (**Admin**)
- `GET /categories/cat-stats` : Get category analytics

## 👥 User Administration (Admin Only)

- `GET /users/all-users` : List all users
- `PUT /users/:id/role` : Promote or demote a user role
- `GET /users/user-stats` : View platform user growth statistics

---

# ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/mdabarik/career-trigger-server.git
cd career-trigger-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a .env file in the root directory:

```bash
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/career-trigger
JWT_ACCESS_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d
NODE_ENV=development
```

### 4. Run the Server

```bash
npm run start:dev

npm run build
npm start

```
