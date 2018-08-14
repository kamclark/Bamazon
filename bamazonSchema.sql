DROP SCHEMA IF EXISTS bamazon;
CREATE SCHEMA bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  stock_quantity SMALLINT NOT NULL,
  price FLOAT NOT NULL,
  PRIMARY KEY  (item_id)
)
