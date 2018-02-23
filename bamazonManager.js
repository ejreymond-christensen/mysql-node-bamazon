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
  if (err)
    throw err;

  //Starts the application is connection is made
  manage();
});

var productArray = [
  ['ID', 'PRODUCT', 'PRICE']
];

var manage = function() {
  inquirer.prompt({
    name: "command",
    type: "list",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  }).then(function(answer) {
    switch (answer.command) {
      case "View Products for Sale":
        listProducts("SELECT * FROM products");
        break;
      case "View Low Inventory":
        listProducts("SELECT * FROM bamazon.products HAVING stock_quantity <5;");
        break;
      case "Add to Inventory":
        addInventory();
        break;
      case "Add New Product":
        addProduct();
        break;
    }
  });
};

var listProducts = function(query) {
  connection.query(query, function(err, results) {
    if (err)
      throw err;
    for (var i = 0; i < results.length; i++) {
      var tempArray = [];
      tempArray.push(results[i].item_id);
      tempArray.push(results[i].product_name);
      tempArray.push(results[i].price);
      tempArray.push(results[i].stock_quantity);
      productArray.push(tempArray);
    }
    displayTable();
    continueManaging();
  });
};

var addInventory = function() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err)
      throw err;
    for (var i = 0; i < results.length; i++) {
      var tempArray = [];
      tempArray.push(results[i].item_id);
      tempArray.push(results[i].product_name);
      tempArray.push(results[i].price);
      tempArray.push(results[i].stock_quantity);
      productArray.push(tempArray);
    }
    displayTable();

    inquirer.prompt([
      {
        name: "receive",
        type: "list",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].product_name);
          }
          return choiceArray;
        },
        message: "What Item would you like to receive inventory for?"
      }, {
        name: "qty",
        type: "input",
        message: "How many are you receiving in?"
      }
    ]).then(function(answer) {
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].product_name === answer.receive) {
          chosenItem = results[i];
        }
      }
      if (chosenItem.item_id === 2) {
        console.log("We are sorry, but Nintendo does not know how to forecast demand for their products and have discontinued this item indefinitely, please receive in another item");
        continueManaging();
      }else{
      connection.query("UPDATE products SET ? WHERE ?", [
        {
          stock_quantity: (parseInt(chosenItem.stock_quantity) + parseInt(answer.qty))
        }, {
          item_id: chosenItem.item_id
        }

      ], function(error) {
        if (error)
          throw err;
        console.log("Transaction complete!");
        console.log("You have received in " + (
        parseInt(answer.qty)) + " " + chosenItem.product_name);
        console.log("Bamazon now currently has " + (
        parseInt(chosenItem.stock_quantity) + parseInt(answer.qty)) + " " + chosenItem.product_name + " in stock");
        continueManaging();
      });
    }
    });
  });
};

var addProduct = function(){
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the name of the product?"
      },
      {
        name: "category",
        type: "input",
        message: "What department does the product fall under?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the pricing of the product?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "stock",
        type: "input",
        message: "What is the stocking level?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
    ]).then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          department_name: answer.category,
          price: answer.price,
          stock_quantity: answer.stock
        },
        function(err) {
          if (err) throw err;
          console.log("The product is now registered");

          continueManaging();
        }
      );
    });
};


var productArray = [
  ['ID', 'PRODUCT', 'PRICE', 'QUANTITY ON HAND']
];
var displayTable = function() {
  let config,
    output;

  config = {
    border: getBorderCharacters('norc')
  };

  output = table(productArray, config);
  console.log(output);
};

var continueManaging = function() {
  inquirer.prompt({type: "confirm", message: "Would you like to continue to managing inventory?", name: "confirm", default: true}).then(function(response) {
    if (response.confirm === true) {
      productArray = [
        ['ID', 'PRODUCT', 'PRICE', 'QUANTITY ON HAND']
      ];
      manage();
    } else {
      console.log("Goodbye");
    }
  });
};
