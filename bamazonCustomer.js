var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");
var moment = require('moment');
var cTable = require('console.table');

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

connection.connect(function(err) {
  if (err) throw err;
  console.log("HEY!");
  DisplayProducts();
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
    type: "input",
    name: "selectedItem",
    message: "Which item would you like to purchase (ID)?"
  }, {
    type: "input",
    name: "purchaseQuantity",
    message: "How many would you like to buy?"
  }]).then(
    function(answers) {
      console.log("Order");
      console.log("~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("Item ID: " + answers.selectedItem);
      console.log("Quantity: " + answers.purchaseQuantity);


      // initializes the variable newOrder to be a ProductOrder object which will take
      // in all of the user's answers to the questions above
      // var newOrder = new ProductOrder(
      //   answers.selectedItem,
      //   answers.purchaseQuantity);
      //
      // newOrder.printInfo();
    });
}

// show all items, names, ID#, prices and departments in console
function DisplayProducts() {
  connection.query('SELECT * FROM products', function(err, res) {
    //Table creation w/out console.table from cTable Package: var results = "Item Id : " + res.item_id + "|" + . . . .
    console.table(res);
    //console.log(res);
  });
};

  // function afterConnection() {
  //
  //   // get time and date at time of connection
  //   var currentTime = Date.now();
  //   // display time and date at time of connection
  //   console.log("As of: " + moment(currentTime).format("M-D-YYYY h:hhA"));
  // }
