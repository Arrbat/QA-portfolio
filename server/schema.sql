CREATE SCHEMA IF NOT EXISTS `users_db`;

USE `users_db`;

CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_login` NVARCHAR(100) NOT NULL,
    `user_password` NVARCHAR(100) NOT NULL
);

USE `users_db`;

CREATE TABLE `tasks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` NVARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `completed` BOOLEAN DEFAULT FALSE,
    `user_id` INT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);