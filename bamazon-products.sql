DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(50) NULL,
department_name VARCHAR(50) NULL,
price DECIMAL(10, 2) NULL,
stock_quantity INT(10) NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ps4", "Electronics", 400, 1000), ("Nintendo NES Classic Edition", "Electronics", 75, 0),
 ("Flux Capacitor", "Auto Parts", 2000, 5),("Schrödinger's Cat", "Pets and Animals", 30, 2),("BFG 9000", "Guns and Ammo", 3000, 10),
 ("Lembas Bread", "Cooking and Food", 10, 10000), ("Ocarina of Time", "Musical Instruments", 50, 400), 
 ("Spice Melange", "Cooking and Food", 4000, 30),("Selo's Drum","Musical Instruments", 60, 50 ),
 ("Red Turtle Shell","Guns and Ammo",20, 600);
