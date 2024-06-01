-- Drop existing tables if they exist to start with a clean slate
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `cart`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `sliderItem`;
DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `popularProducts`;

-- Create the `user` table
CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT FALSE,
    -- `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the `product` table
CREATE TABLE `product` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `image_url` VARCHAR(255),
    -- `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the `cart` table
CREATE TABLE `cart` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    -- `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);

-- Create the `order` table
CREATE TABLE `order` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `cart_id` INT NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    -- `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
);

-- Create the `sliderItem` table
CREATE TABLE `sliderItem` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `image_url` VARCHAR(255),
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `backgroundColor` VARCHAR(255),
    -- `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the `category` table
CREATE TABLE `category` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `img` VARCHAR(255),
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    -- `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the `popularProducts` table
CREATE TABLE `popularProducts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `image_url` VARCHAR(255),
    -- `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
