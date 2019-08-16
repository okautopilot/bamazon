var inquirer = require('inquirer');
var mysql = require('mysql');

function purchaseInqiure() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the ID of the item you wish to buy.',
            filter: Number
        },
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you wish to purchase?',
			filter: Number
		}
    ]).then(function(input) {
        var item = input.item_id;
        var quantity = input.quantity;

        var itemQuery = 'select * from products where ?';

        connection.query(itemQuery, {item_id: item}, function(error, data) {
            if (error)
                throw error;

            if (data.length === 0) {
                console.log("You've selected an unexisting item ID. Please try again."); 
                showItems();
            }
            else {
                var products = data[0];
                if (quantity <= products.stock_quantity) {
                    console.log("We have that item. Placing it in your cart.")
                    // I think this works for update function I hope, check this again for db issues it might cause 
                    var updateIQ = 'update products set stock_quantity = ' + (products.stockquantity - quantity) + 'where item_id =' + item;

                    connection.query(updateIQ, function(error, data){
                        if (error)
                            throw error;

                            console.log("Your order has been fulfilled. The total is $" + products.price * quantity);
                            connection.end();
                    })
                } else {
                    console.log("Sorry, your order is unable to be fulfilled. Perhaps we ran out of that item. What about something else?");
                    showItems();
                }
            }
        
        })
    })
}

function showItems() {
    // No where let's just grab all?
    var itemQuery = 'select * from products';

    connection.query(itemQuery, function(error, data) {
        if (error)
            throw error;
            console.log("Here is our existing stock of goods: ")
            var itemDisplay = '';
            // Loop to go through whole db
            for (var i = 0; i < data.length; i++) {
                // This is gonna be super ugly I think, let's find out
                console.log ('Item ID: ' + data[i].item_id + "\n" + 'Product Name: ' + data[i].product_name + "\n" + 'Department: ' +  data[i].department_name + "\n" + 'Price: $' + data[i].price + '\n')
            }

            purchaseInqiure();
    })
}

function bamazonGo() {
    showItems();
}

bamazonGo();