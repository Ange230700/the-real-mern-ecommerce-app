-- Drop existing tables if they exist to start with a clean slate
DROP TABLE IF EXISTS `user`;

DROP TABLE IF EXISTS `cart`;

DROP TABLE IF EXISTS `product`;

DROP TABLE IF EXISTS `purchase`;

DROP TABLE IF EXISTS `sliderItem`;

DROP TABLE IF EXISTS `category`;

DROP TABLE IF EXISTS `popularProducts`;

-- junction tables
DROP TABLE IF EXISTS `product_category`;

DROP TABLE IF EXISTS `product_order`;

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
-- $ Create the tables
CREATE TABLE
  `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  `cart` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `userId` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
  );

CREATE TABLE
  `product` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `image_url` VARCHAR(255),
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  `purchase` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
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
    FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
    FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`),
    PRIMARY KEY (`productId`, `categoryId`)
  );

CREATE TABLE
  `product_order` (
    `productId` INT NOT NULL,
    `orderId` INT NOT NULL,
    FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
    FOREIGN KEY (`orderId`) REFERENCES `purchase` (`id`),
    PRIMARY KEY (`productId`, `orderId`)
  );