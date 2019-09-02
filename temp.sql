USE bamazon;

CREATE TABLE departments (
  departmentsid INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs INT NULL,
  date_added datetime default current_timestamp,
  PRIMARY KEY (departmentsid)
);

INSERT INTO departments (department_name, over_head_costs) 
VALUES ();

-- CREATE TABLE bid (
--   id INT NOT NULL AUTO_INCREMENT,
--   departments_id INT NOT NULL,
--   price INT NOT NULL,
--   date_added datetime default current_timestamp,
--   PRIMARY KEY (id)
-- );

-- INSERT INTO bid (departments_id, price) VALUES (1, 50);

-- CREATE TABLE userpass (
--   id INT NOT NULL AUTO_INCREMENT,
--   username INT NOT NULL,
--   pw INT NOT NULL,
--   date_added datetime default current_timestamp,
--   PRIMARY KEY (id)
-- );

