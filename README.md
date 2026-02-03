# Career Trigger Server

**Career Trigger Server** is a scalable, high-performance backend system engineered for a career-focused community platform. Built with **Node.js**, **Express**, **TypeScript** and **Mongoose** this project emphasizes strict architectural patterns to ensure maintainability, security, and scalability.

It features a complete content management system with **Role-Based Access Control (RBAC)**, allowing distinct privileges for Admins, Editors, and Users.

---

## 🏛️ Engineering & Architecture

This project implements **Modular Layered Architecture**. Each domain (User, Post, Auth) is encapsulated, ensuring separation of concerns.

### Design Principles & Patterns Applied

- **Layered Architecture:** strict separation between the **Transport Layer** (Routers/Controllers), **Business Logic Layer** (Services), and **Data Access Layer** (Models).
- **SOLID Principles:**
    - _Single Reponsibility:_ Each file has a single responsibility (e.g., Controllers only handle HTTP requests, Services handle logic).
    - _Open Closed Principle:_ This project follows open closed principles, open for extention and closed for modifications..
    - _Liskov Substitution Principle:_ This project implmented Likov Substitution principle, it can be replaced with parents behaviour.
    - _Interface Segregation Principle:_ Services & Controllers file has ISP implemented, not forcing implementing dependencies that might not required.
    - _Dependency Injection:_ Services & controllers are using dependency injection so it's easy for refactoring.

- **Singleton Pattern:** Utilized for Database Connections and Configuration management to ensure efficient resource usage.
- **DRY (Don't Repeat Yourself):** Reusable `AppError` classes, `catchAsync` wrappers, and global middlewares reduce code redundancy.
- **KISS & YAGNI:** The codebase avoids over-engineering, focusing on clean, readable solutions that solve the immediate business requirements without unnecessary complexity.

---

### Development Tools

- Linting: ESLint configuration included
- Formatting: Prettier configuration included
- Type Checking: TypeScript with tsconfig.json
- Validation: Zod & Joi schemas for request validation

---

## 📂 Project Structure

The project follows a **Layered Architecture - Extended version of MVC**, making it easy to navigate and scale:

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

| Role                   | Access          | Responsibilities                                                                          |
| ---------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| **Admin**              | Root Access     | Manage all users, assign roles, view system-wide stats, and manage all content/categories |
| **Editor / Moderator** | Elevated Access | Create, update, and delete posts. Can change post status (e.g., Publish/Declined)         |
| **User**               | Standard        | Create personal posts                                                                     |

---

# 🚀 API Endpoints Overview

All routes are prefixed with **`/api/v1`**

## 🔐 Authentication

- `POST /auth/register` : register new user
- `POST /auth/login` : secured login (Returns Access Token & Refresh Token)
- `POST /auth/refresh` : genearte new Access Token using Refresh Token

## 📝 Post Management

- `GET /posts` : retrieve all posts
- `GET /posts/id/:id` : retrieve single post details
- `POST /posts/create` : create new post (**Auth Required**)
- `PUT /posts/update/:id` : update content (**Author/Admin**)
- `PATCH /posts/update-post-status/:id` : update publication status (**Admin/Editor**)
- `DELETE /posts/delete/:id` : delete post (**Author**)

## 📁 Categories

- `GET /categories` : retrieve all categories
- `POST /categories/create-cat` : create new category (**Admin**)
- `GET /categories/cat-stats` : get category stats (**Authorize**)

## 👥 User Administration (Admin Only)

- `GET /users/all-users` : retrieve all users (**Admin Only**)
- `PUT /users/:id/role` : change role of user (**Admin Only**)
- `GET /users/user-stats` : retrieve users stats ((**Admin Only**))

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

### Thanks
