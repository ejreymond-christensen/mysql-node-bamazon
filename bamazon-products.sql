DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(50) NULL,
department_name VARCHAR(50) NULL,
price DECIMAL(10, 2) NULL,
stock_quantity INT(10) NULL,
product_sales DECIMAL(10, 2) NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("ps4", "Electronics", 400, 1000, 40000), ("Nintendo NES Classic Edition", "Electronics", 75, 0, 500),
 ("Flux Capacitor", "Auto Parts", 2000, 5, 10000),("Schrödinger's Cat", "Pets and Animals", 30, 2, 500),("BFG 9000", "Guns and Ammo", 3000, 10, 15000),
 ("Lembas Bread", "Cooking and Food", 10, 10000, 20000), ("Ocarina of Time", "Musical Instruments", 50, 400, 8000), 
 ("Spice Melange", "Cooking and Food", 4000, 30, 60000),("Selo's Drum","Musical Instruments", 60, 50, 10000 ),
 ("Red Turtle Shell","Guns and Ammo",20, 600, 20000);
 
 
CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(50) NULL,
over_head_costs DECIMAL(10, 2) NULL
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 50000), ("Auto Parts", 5000), ("Pets and Animals", 10000), ("Guns and Ammo", 40000),
("Cooking and Food", 30000), ("Musical Instruments", 15000);
