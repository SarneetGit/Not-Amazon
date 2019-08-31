DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  productsid INT NOT NULL AUTO_INCREMENT,
  products_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  date_added datetime default current_timestamp,
  PRIMARY KEY (productsid)
);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Alexa Echo Dot Smart Speaker", "Electronics", 30, 15);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Playstation Store Gift Card", "Gaming", 50, 20);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Alexa Echo Dot Smart Speaker", "Electronics", 30, 15);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Alexa Echo Dot Smart Speaker", "Electronics", 30, 15);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Alexa Echo Dot Smart Speaker", "Electronics", 30, 15);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Alexa Echo Dot Smart Speaker", "Electronics", 30, 15);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Alexa Echo Dot Smart Speaker", "Electronics", 30, 15);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Alexa Echo Dot Smart Speaker", "Electronics", 30, 15);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Alexa Echo Dot Smart Speaker", "Electronics", 30, 15);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Alexa Echo Dot Smart Speaker", "Electronics", 30, 15);

CREATE TABLE bid (
  id INT NOT NULL AUTO_INCREMENT,
  products_id INT NOT NULL,
  price INT NOT NULL,
  date_added datetime default current_timestamp,
  PRIMARY KEY (id)
);

INSERT INTO bid (products_id, price) VALUES (1, 50);

CREATE TABLE userpass (
  id INT NOT NULL AUTO_INCREMENT,
  username INT NOT NULL,
  pw INT NOT NULL,
  date_added datetime default current_timestamp,
  PRIMARY KEY (id)
);

