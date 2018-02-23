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
  supervise();
});

var departmentArray = [
  ['ID', 'DEPARTMENT', 'OVERHEAD COST', 'PRODUCT SALES', 'TOTAL PROFIT']
];

var supervise = function(){
  inquirer.prompt({
    name: "command",
    type: "list",
    message: "What would you like to do?",
    choices: ["View Product Sales by Department", "Create New Department"]
  }).then(function(answer) {
    switch (answer.command) {
      case "View Product Sales by Department":
        listProducts();
        break;
      case "Create New Department":
        createDepartment();
        break;
    }
  });
};

var listProducts = function() {

  connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS total_product_sales FROM products LEFT JOIN departments ON departments.department_name = products.department_name GROUP BY department_id", function(err, results) {
    if (err)
      throw err;
    for (var i = 0; i < results.length; i++) {
      var tempArray = [];
      tempArray.push(results[i].department_id);
      tempArray.push(results[i].department_name);
      tempArray.push(results[i].over_head_costs);
      tempArray.push(results[i].total_product_sales);
      tempArray.push((results[i].total_product_sales)-(results[i].over_head_costs));
      departmentArray.push(tempArray);
    }
    displayTable();
    continueSupervising();
  });
};

var createDepartment = function(){
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the new department?"
      },
      {
        name: "overhead",
        type: "input",
        message: "What is the overhead cost for this department?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ]).then(function(answer) {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: answer.department,
          over_head_costs: answer.overhead
        },
        function(err) {
          if (err) throw err;
          console.log("The department is now registered");

          continueSupervising();
        }
      );
    });
};

var displayTable = function() {
  let config,
    output;

  config = {
    border: getBorderCharacters('norc')
  };

  output = table(departmentArray, config);
  console.log(output);
};

var continueSupervising = function() {
  inquirer.prompt({type: "confirm", message: "Would you like to continue to managing inventory?", name: "confirm", default: true}).then(function(response) {
    if (response.confirm === true) {
      departmentArray = [
        ['ID', 'DEPARTMENT', 'OVERHEAD COST', 'PRODUCT SALES', 'TOTAL PROFIT']
      ];
      supervise();
    } else {
      console.log("Goodbye");
        connection.end();
    }
  });
};
