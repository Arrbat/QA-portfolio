# TL;DR

Just TODO application with login/registration form and unique task-panel for each user. HTML+CSS+Javascript (React+Node.js)

Main goal is to show both manual and automation QA skills. See docs for reports and tests directory for automated tests.

_Project is still under development_

# Navigation

Will be added soon

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

After setup, run server:

```powershell
node server/server.js
```

and run frontend

```powershell
cd client

npm start
```
