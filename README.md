# TL;DR

This is a simple **TODO application** built with **JavaScript, React, and Node.js**, using **Express** for backend and **Axios** for client–server communication.

It includes a **Login / Registration page** with a user database and a personalized **Task Panel**.

> **Project goal:** to demonstrate skills in software testing, QA process design, and basic full-stack web development.

---

##### Total number of automated tests: `7`

##### Total number of manual tests: `6`

##### Total number of checklists: `3`

##### Total number of bug-reports: `1`

_Project is still under development_

# Navigation

`tests/` contains automated tests and required dependencies for them.

`server` and `client` contain source code and dependencies for application.

`.github/workflows` contain **CI/CD** pipelines such as automated tests integration (Jest+Playwright).

`docs` contain documentaion such as bug-reports, checklists, test-cases, test reports, test plan.

# Tests and dependencies

Run `npx jest` from any project's directory to run all Jest tests.

Jest tests use SQLite server as imitation of real MySQL server.

---

Run `npx playwright test` from `tests/playwright` directory to run Playwright tests

Use `npx playwright show-report` from `tests/playwright` directory for opening HTML report

>Ensure client and server is running before starting playwright tests

# Setup

- Node.js v22.20.0 (x64) needs to be configured. `server/server.js` needs proper credentials. Also, everything is designed to working on only localhost.

- MySQL (pre-built v8.0 for Windows) needs to be installed. Following SQL query was used for creating DB and users+tasks table:

```sql
CREATE SCHEMA IF NOT EXISTS `users_db`;

USE `users_db`;

CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_login` NVARCHAR(100) NOT NULL,
    `user_password` NVARCHAR(100) NOT NULL
);
```

```sql
USE `users_db`;

CREATE TABLE `tasks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` NVARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `completed` BOOLEAN DEFAULT FALSE,
    `user_id` INT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
```

---

To run server:

```powershell
node server/server.js
```

To run client:

```powershell
cd client

npm start
```

