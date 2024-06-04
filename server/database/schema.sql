-- $ Conceptual data model for the database
-- § Relationships between user and cart
-- a user can have only one cart and a cart is associated with only one user. (one-to-one, foreign key in cart)
-- § Relationships between product and cart
-- a cart can have many products and a product can be in only one cart. (one-to-many, foreign key in product)
-- § Relationships between product and category
-- a product can have many categories and a category can have many products. (many-to-many, junction table)
-- § Relationships between product and purchase
-- a purchase can have many products and a product can be in many purchases. (many-to-many, junction table)
-- § Relationships between user and purchase
-- a user can have many purchases and an purchase is associated with only one user. (one-to-many, foreign key in purchase)
-- % Based on the conceptual data model above, give me the entire schema for the database. Mind the insertion of foreign keys based on one-to-one, one-to-many, and many-to-many relationships.
-- Drop existing tables and junction tables if they exist to start with a clean slate
DROP TABLE IF EXISTS `User`;

DROP TABLE IF EXISTS `Cart`;

DROP TABLE IF EXISTS `Product`;

DROP TABLE IF EXISTS `purchase`;

DROP TABLE IF EXISTS `sliderItem`;

DROP TABLE IF EXISTS `category`;

DROP TABLE IF EXISTS `popularProducts`;

-- junction tables
DROP TABLE IF EXISTS `product_category`;

DROP TABLE IF EXISTS `product_order`;

-- $ Create the tables
CREATE TABLE
  `User` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `is_admin` BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  `Cart` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
  );

CREATE TABLE
  `Product` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `image_url` VARCHAR(255),
    `product_adjective` VARCHAR(255),
    `product_material` VARCHAR(255),
    `product_description` TEXT,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  `Purchase` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
  );

CREATE TABLE
  `sliderItem` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  `category` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  `popularProduct` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
  );

-- junction tables
CREATE TABLE
  `product_category` (
    `productId` INT NOT NULL,
    `categoryId` INT NOT NULL,
    FOREIGN KEY (`productId`) REFERENCES `Product` (`id`),
    FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`),
    PRIMARY KEY (`productId`, `categoryId`)
  );

CREATE TABLE
  `product_order` (
    `productId` INT NOT NULL,
    `orderId` INT NOT NULL,
    FOREIGN KEY (`productId`) REFERENCES `Product` (`id`),
    FOREIGN KEY (`orderId`) REFERENCES `Purchase` (`id`),
    PRIMARY KEY (`productId`, `orderId`)
  );