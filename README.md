# CodeCrack 🚀

Welcome to **CodeCrack** – your all-in-one coding practice platform! ,this is a code execution platform to solve DSA problems with ease.
This project is designed to help users practice coding problems, manage playlists, submit solutions, and track their progress, all with a modern backend built on Node.js, Express, and Prisma.  
Whether you’re prepping for interviews or just love solving problems, LeetLab has you covered! 🎯

---

## ✨ Features

### 👤 Authentication & User Management
- **Register & Login:** Secure user registration and login with JWT-based authentication.
- **Role-based Access:** Admin and user roles for fine-grained permissions.
- **Session Management:** HTTP-only cookies for secure session handling.
- **Logout & Auth Check:** Endpoints to log out and verify authentication status.

### 📝 Problem Management
- **Create Problems:** Admins can add new coding problems with:
  - Title, description, difficulty, tags, examples, constraints, code snippets, and reference solutions in multiple languages.
  - Batch test case validation using Judge0 API.
- **Update & Delete Problems:** Full CRUD for problems (admin only).
- **View Problems:** Fetch all problems or a specific problem by ID.
- **Solved Problems:** Users can view problems they’ve solved.

### 🧑‍💻 Code Execution & Submission
- **Run & Submit Code:** Users can execute code against custom or problem test cases using Judge0.
- **Multi-language Support:** Submit solutions in various programming languages.
- **Detailed Results:** Get per-testcase feedback (stdout, stderr, memory, time, pass/fail).
- **Submission History:** Track all your submissions and see which problems you’ve solved.

### 📚 Playlists
- **Create Playlists:** Organize problems into custom playlists.
- **Add/Remove Problems:** Easily manage problems within playlists.
- **View Playlists:** Fetch all your playlists or a specific one by ID.
- **Delete Playlists:** Remove playlists you no longer need.

### 📊 Submissions & Analytics
- **Submission Count:** See how many times a problem has been attempted.
- **Submission Details:** Fetch all submissions or filter by problem.

### 🔒 Middleware & Security
- **Authentication Middleware:** Protects routes and ensures only authorized users can access certain features.
- **Admin Middleware:** Restricts problem management to admins.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** Prisma ORM (with PostgreSQL or your choice)
- **Code Execution:** Judge0 API integration
- **Authentication:** JWT, bcrypt, secure cookies

---

## 🧩 API Overview

- **Auth:** `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/check`
- **Problems:** `/api/problem/create-problem`, `/api/problem/:id`, `/api/problem/update/:id`, `/api/problem/delete/:id`
- **Code Execution:** `/api/execute-code/`
- **Submissions:** `/api/submission/get-all-submissions`, `/api/submission/problem/:problemId`
- **Playlists:** `/api/playlist/`, `/api/playlist/:playlistId`

---

## 🌟 Why CodeCrack?

- **Modern, modular codebase** for easy extension and maintenance.
- **Rich feature set** for both users and admins.
- **Real code execution** with Judge0 for a true coding platform experience.
- **Playlist system** to organize and focus your practice.
- **Detailed analytics** to track your progress and improve.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

> Made with ❤️ for coders, by coders.
