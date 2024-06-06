-- $ Conceptual data model for the database
-- § Relationships between user and cart
-- a user can have many carts and a cart is associated with only one user. (many-to-one, foreign key in cart)
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

DROP TABLE IF EXISTS `Purchase`;

DROP TABLE IF EXISTS `Slider_item`;

DROP TABLE IF EXISTS `Category`;

DROP TABLE IF EXISTS `Popular_product`;

-- junction tables
DROP TABLE IF EXISTS `Product_category`;

DROP TABLE IF EXISTS `Product_order`;

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
  `Slider_item` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  `Category` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  `Popular_product` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
  );

-- junction tables
CREATE TABLE
  `Product_category` (
    `product_id` INT NOT NULL,
    `category_id` INT NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `Category` (`id`),
    PRIMARY KEY (`product_id`, `category_id`)
  );

CREATE TABLE
  `Product_order` (
    `product_id` INT NOT NULL,
    `order_id` INT NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`),
    FOREIGN KEY (`order_id`) REFERENCES `Purchase` (`id`),
    PRIMARY KEY (`product_id`, `order_id`)
  );