# ut-mysql-node-bamazon
CLI inventory tracker using MySQL and node

### Bamazon App
This is an app that is run through the terminal with node and runs off a MySQL database and is a basic inventory system. The user can run three programs from the CLI,`bamazonCustomer.js`, `bamazonManager.js`, `bamazonSupervisor.js`.

### How to use Bamazon
Videos for each of the modules can be found in the video folder. ![movie](https://github.com/ejreymond-christensen/ut-mysql-node-bamazon/blob/master/bamazon-demo.m4v)

`bamazonCustomer.js` - this alllows the customer to select and purchase items with the help of inquirer. All transactions will update the database in MySQL.

`bamazonManager.js` - this program allows 4 options for the manager of stock. View Products for Sale, View Low Inventory, Add to Inventory, Add New Product. These are aided with inquirer and update the database with any changes. When adding new products, the choices of price and department are validated. New departments can be added, but only by the supervisor program.

`bamazonSupervisor.js` - This program can display the profit margins for each department and add new departments to the program. Again, all transactions will update the database in MySQL

### How to run the program
You can go to ut-mysql-node-bamazon repo and download the repo. with terminal, run `npm install`and all dependencies will be installed for running the program. A database will need to be set up and one can use the bamazon-products.sql file for set up. Next just run the program that you would like to use out of the terminal via node.
