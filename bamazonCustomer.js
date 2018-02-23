var inquirer = require("inquirer");
var mysql = require("mysql");
const {table, getBorderCharacters} = require('table');

// Database Info
var connection = mysql.createConnection({
  host: "localhost", port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// Function to connect to the Server
connection.connect(function(err) {
  // if (err)
  //   throw err;

  //Starts the application is connection is made
  start();
});

var productArray = [
  ['ID', 'PRODUCT', 'PRICE']
];

var start = function() {

  // Log all results of the SELECT statement
  connection.query("SELECT * FROM products", function(err, results) {
    if (err)
      throw err;

    for (var i = 0; i < results.length; i++) {
      var tempArray = [];
      tempArray.push(results[i].item_id);
      tempArray.push(results[i].product_name);
      tempArray.push(results[i].price);
      productArray.push(tempArray);
    }
    displayTable();

    inquirer.prompt([
      {
        name: "item_id",
        type: "input",
        message: "Please select the ID of the product you would like to buy",
        validate: function(value) {
          if (isNaN(value) === false && value > 0 && value <= results.length) {
            return true;
          }
          return false;
        }
      }, {
        name: "qty",
        type: "input",
        message: "How how many would you like to purchase?"
      }
    ]).then(function(answer) {
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (parseInt(results[i].item_id) === parseInt(answer.item_id)) {
          chosenItem = results[i];
        }
      }

      if (chosenItem.stock_quantity > parseInt(answer.qty)) {
        connection.query("UPDATE products SET ? WHERE ?", [
          {
            stock_quantity: (chosenItem.stock_quantity - parseInt(answer.qty))
          }, {
            item_id: chosenItem.item_id
          }

        ], function(error) {
          if (error)
            throw err;
          console.log("Your order has been processed!");
          console.log("You have purchased "+(parseInt(answer.qty))+" "+chosenItem.product_name);
          console.log("Your account has been charged  "+(parseInt(answer.qty)*chosenItem.price)+ " dollars");
          continueShopping();
        });
      }else{
        console.log("Sorry, but we don't have enough stock at this time! Please try again later.");
        continueShopping();
      }
    });
  });
};

var displayTable = function() {
  let config,
    output;

  config = {
    border: getBorderCharacters('norc')
  };

  output = table(productArray, config);
  console.log(output);
};

var continueShopping = function(){
  inquirer.prompt({type: "confirm", message: "Would you like to continue shopping?", name: "confirm", default: true}).then(function(response) {
    if (response.confirm === true) {
      start();
    } else {
      console.log("Please come back later!");
    }
  });
};
