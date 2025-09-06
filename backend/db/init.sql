USE ecommerce;

DELIMITER $$

CREATE TRIGGER insert_stock_after_product
AFTER INSERT ON product
FOR EACH ROW
BEGIN
  INSERT INTO stock (productId, quantity, createdAt, updatedAt)
  VALUES (NEW.id, 0, NOW(), NOW());
END $$

DELIMITER ;