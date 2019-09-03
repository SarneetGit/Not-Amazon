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
VALUES ("Dove Soap", "Beauty", 5, 50);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Deodorant", "Health & Personal Care", 2, 75);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Bounty", "Health & Personal Care", 20, 50);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Rice Krispies", "Groceries", 5, 30);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("AmazonBasics Yoga Matt", "Sports", 10, 20);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Epsom Salt", "Health & Personal Care", 10, 15);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Lacrosse Ball", "Health & Personal Care", 5, 100);

INSERT INTO products (products_name, department_name, price, stock_quantity) 
VALUES ("Colgate 360 Sensitive Pro Relief", "Oral Hygiene Products", 10, 25);

CREATE TABLE product_sales (
  product_salesid INT NOT NULL AUTO_INCREMENT,
  productsid INT NOT NULL,
  products_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  date_added datetime default current_timestamp,
  PRIMARY KEY (product_salesid)
);

INSERT INTO product_sales (productsid, products_name, price, stock_quantity) 
VALUES (1, "Alexa Echo Dot Smart Speaker", 30, 15);

CREATE TABLE departments (
  departmentsid INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs INT NULL,
  date_added datetime default current_timestamp,
  PRIMARY KEY (departmentsid)
);

INSERT INTO departments (department_name, over_head_costs) 
VALUES ('Electronics', '250');

INSERT INTO departments (department_name, over_head_costs) 
VALUES ('Beauty', '150');

INSERT INTO departments (department_name, over_head_costs) 
VALUES ('Gaming', '150');

INSERT INTO departments (department_name, over_head_costs) 
VALUES ('Health & Personal Care', '150');

INSERT INTO departments (department_name, over_head_costs) 
VALUES ('Groceries', '100');

INSERT INTO departments (department_name, over_head_costs) 
VALUES ('Oral Hygiene Products', '75');

INSERT INTO departments (department_name, over_head_costs) 
VALUES ('Office Supplies', '50');

CREATE TABLE userpass (
  id INT NOT NULL AUTO_INCREMENT,
  username INT NOT NULL,
  pw INT NOT NULL,
  date_added datetime default current_timestamp,
  PRIMARY KEY (id)
);



