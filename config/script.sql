-- DROP statements (si existen)
DROP TABLE IF EXISTS CollectionProduct;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS collection;
DROP DATABASE IF EXISTS funko_store;

-- CREATE DATABASE
CREATE DATABASE funko_store;

-- USE DATABASE
USE funko_store;

-- CREATE TABLE product
CREATE TABLE product (
    product_id INT PRIMARY KEY,
    licence_name VARCHAR(50),
    category_name VARCHAR(50),
    product_name VARCHAR(50),
    product_description TEXT,
    product_price DECIMAL(10, 2),
    dues INT,
    product_sku VARCHAR(50),
    img_front VARCHAR(255),
    img_back VARCHAR(255)
);

-- CREATE TABLE collection
CREATE TABLE collection (
    collection_id INT PRIMARY KEY,
    collection_name VARCHAR(50),
    collection_description VARCHAR(255),
    category_name VARCHAR(50),
    collection_price DECIMAL(10, 2),
    dues INT,
    collection_sku VARCHAR(255),
    img_front VARCHAR(255),
    img_back VARCHAR(255)
);

-- CREATE TABLE CollectionProduct
CREATE TABLE CollectionProduct (
    collection_id INT,
    product_id INT,
    PRIMARY KEY (collection_id, product_id),
    FOREIGN KEY (collection_id) REFERENCES collection(collection_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);



-- Agrega los productos

INSERT INTO product (
    product_id,
    licence_name,
    category_name,
    product_name,
    product_description,
    product_price,
    dues,
    product_sku,
    img_front,
    img_back
) VALUES
(1, 'Harry Potter', 'Animation & Cartoons', 'Harry Potter', 'Harry Potter with his wand', 14.99, 0, 'F-1183', 'img/harry-potter.jpg', 'img/harry-potter-back.jpg'),
(2, 'Harry Potter', 'Animation & Cartoons', 'Hermione Granger', 'Hermione Granger with her books', 14.99, 0, 'F-1184', 'img/hermione-granger.jpg', 'img/hermione-granger-back.jpg'),
(3, 'Harry Potter', 'Animation & Cartoons', 'Ron Weasley', 'Ron Weasley with his wand', 14.99, 0, 'F-1185', 'img/ron-weasley.jpg', 'img/ron-weasley-back.jpg'),
(4, 'Marvel', 'Comics & Superheroes', 'Iron Man', 'Iron Man in his suit', 14.99, 0, 'F-1186', 'img/iron-man.jpg', 'img/iron-man-back.jpg'),
(5, 'Marvel', 'Comics & Superheroes', 'Captain America', 'Captain America with his shield', 14.99, 0, 'F-1187', 'img/captain-america.jpg', 'img/captain-america-back.jpg'),
(6, 'Marvel', 'Comics & Superheroes', 'Thor', 'Thor with his hammer', 14.99, 0, 'F-1188', 'img/thor.jpg', 'img/thor-back.jpg'),
(7, 'Star Wars', 'Sci-Fi', 'Luke Skywalker', 'Luke Skywalker with his lightsaber', 14.99, 0, 'F-1189', 'img/luke-skywalker.jpg', 'img/luke-skywalker-back.jpg'),
(8, 'Star Wars', 'Sci-Fi', 'Princess Leia', 'Princess Leia with her blaster', 14.99, 0, 'F-1190', 'img/princess-leia.jpg', 'img/princess-leia-back.jpg'),
(9, 'Star Wars', 'Sci-Fi', 'Han Solo', 'Han Solo with his blaster', 14.99, 0, 'F-1191', 'img/han-solo.jpg', 'img/han-solo-back.jpg'),
(10, 'Pokémon', 'Anime & Manga', 'Pikachu', 'Pikachu with its lightning bolt', 14.99, 0, 'F-1192', 'img/pikachu.jpg', 'img/pikachu-back.jpg'),
(11, 'Pokémon', 'Anime & Manga', 'Charmander', 'Charmander with its tail flame', 14.99, 0, 'F-1193', 'img/charmander.jpg', 'img/charmander-back.jpg'),
(12, 'Pokémon', 'Anime & Manga', 'Squirtle', 'Squirtle with its water spout', 14.99, 0, 'F-1194', 'img/squirtle.jpg','img/squirtle-back.jpg');

-- Agrega las colecciones

INSERT INTO collection (
    collection_id,
    collection_name,
    collection_description,
    category_name,
    collection_price,
    dues,
    collection_sku,
    img_front,
    img_back
) VALUES
(1, 'Harry Potter', 'The Wizarding World of Harry Potter', 'Animation & Cartoons', 59.99, 0, 'C-1234', 'img/harry-potter-collection.jpg', 'img/harry-potter-collection-back.jpg'),
(2, 'Marvel', 'The Avengers', 'Comics & Superheroes', 59.99, 0, 'C-1235', 'img/marvel-avengers-collection.jpg', 'img/marvel-avengers-collection-back.jpg'),
(3, 'Star Wars', 'The Original Trilogy', 'Sci-Fi', 59.99, 0, 'C-1236', 'img/star-wars-original-trilogy.jpg', 'img/star-wars-original-trilogy-back.jpg'),
(4, 'Pokémon', 'Kanto Starters', 'Anime & Manga', 44.97, 0, 'C-1237', 'img/pokemon-kanto-starters-collection.jpg', 'img/pokemon-kanto-starters-collection-back.jpg');


-- Agrega los datos a CollectionProduct

INSERT INTO CollectionProduct (collection_id, product_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 7),
(3, 8),
(3, 9),
(4, 10),
(4, 11),
(4, 12);
