var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");
var moment = require('moment');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "lotus",
  database: "bamazon"
});


// constructor function used to create order objects
function ProductOrder(productID, productQuantity) {
  this.productID = productID;
  this.productQuantity = productQuantity;
}

function PurchaseProduct(id, quantity) {

}

// creates the printInfo method and applies it to all order objects
ProductOrder.prototype.printInfo = function() {
  console.log(this.productID + "\nProduct Quantity: " + this.productQuantity);
};

// asks for user input to select which item they want to purchase and how many
function PromptUser() {
  // Create a series of questions
  inquirer.prompt([{
      type: "list",
      name: "selectedItem",
      message: "Which item would you like to purchase?",

      choices: ["ID: 1", "ID: 2", "ID: 3", "ID: 4", "ID: 5", "ID: 6", "ID: 7", "ID: 8", "ID: 9", "ID: 10",
        "ID: 11",
      ]
    },
    {
      type: "input",
      name: "purchaseQuantity",
      message: "How many would you like to buy?",
    }
  ]).then(function(answers) {
    // initializes the variable newOrder to be a ProductOrder object which will take
    // in all of the user's answers to the questions above
    var newOrder = new ProductOrder(
      answers.selectedItem,
      answers.purchaseQuantity);

    newOrder.printInfo();
  });
}

// show all items, names, ID#, prices and departments in console
function DisplayProducts(result) {
  console.log("Item(ID#): " + result.product_name + "(" + result.item_id + ")" + "  Price: " + result.price + "  Department: " +
    result.department_name + "  In Stock: " + result.stock_quantity);
}

connection.connect(function(err) {
  if (err) throw err;
  console.log("\nconnected as id " + connection.threadId);
  afterConnection();

  // counts how many rows in item_id column of products table and returns it as cnt
  connection.query("SELECT COUNT(item_id) as cnt FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n" + res[0].cnt + " items available.");
    var productsAvailable = res[0].cnt;
  });

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    for (i = 0; i < 11; i++) {
      DisplayProducts(res[i]);
    }
    console.log("\n")
  });

  PromptUser();
  connection.end();
});

function afterConnection() {

  // get time and date at time of connection
  var currentTime = Date.now();
  // display time and date at time of connection
  console.log("As of: " + moment(currentTime).format("M-D-YYYY h:hhA"));
}
