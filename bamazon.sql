create database bamazon;

use bamazon;

create table products (
item_id integer(15) auto_increment not null,
product_name varchar(50) not null,
department_name varchar(50) not null,
price decimal(10, 2) not null,
stock_quantity integer(15) not null,
primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ('Banana', 'Produce', 2.00, 500),
	('Red Bull', 'Grocery', 3.85, 80),
    ('Basketball', 'Sports', 23.00, 50),
    ('Cereal', 'Grocery', 4.50, 1000),
    ('Salmon', 'Seafood', 15.00, 40),
    ('Macaroni Salad', 'Deli', 5.50, 30),
    ('Paper Towels', 'Grocery', 4.00, 100),
    ('ESPN Magazine', 'Grocery', 7.50, 30),
    ('Lettuce', 'Produce', 2.50, 80);