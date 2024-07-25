-- $ Conceptual data model for the application database.
-- § Relationship between user and item
-- one user can have many items and one item belongs to one user. (one-to-many relationship, foreign key in Item table)

DROP TABLE IF EXISTS `User`;

CREATE TABLE
  `User` (
    `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
  );

CREATE TABLE
  `Item` (
    `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT FK_Item_user_id FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE
  );