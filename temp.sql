USE bamazon;

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

-- CREATE TABLE bid (
--   id INT NOT NULL AUTO_INCREMENT,
--   product_sales_id INT NOT NULL,
--   price INT NOT NULL,
--   date_added datetime default current_timestamp,
--   PRIMARY KEY (id)
-- );

-- INSERT INTO bid (product_sales_id, price) VALUES (1, 50);

-- CREATE TABLE userpass (
--   id INT NOT NULL AUTO_INCREMENT,
--   username INT NOT NULL,
--   pw INT NOT NULL,
--   date_added datetime default current_timestamp,
--   PRIMARY KEY (id)
-- );

