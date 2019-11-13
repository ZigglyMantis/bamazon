DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
  item_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);
USE bamazon_DB;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Laptop", "Electronics", "500", 5);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Chair", "Furniture", "50", 15);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Table", "Furniture", "100", 10);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Lego Dinosaur", "Toys", "40", 10);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "iPhone 13", "Electronics", "1500", 1);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Cheetos", "Consumables", "5", 25);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Basketball", "Sports", "30", 15);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Timascus Baseball Bat", "Antiquities", "800", 5);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Midas's Hand", "?????", "500000", 1);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Potato", "Consumable", "1", 50);
