var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "docker",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "selectItem",
      type: "list",
      message: "Would you like to [BUY] an item?",
      choices: ["BUY","EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either buy or exit
      if (answer.selectItem === "BUY") {        
        buyItem();
      } else{
        connection.end();
      }
    });
}

function buyItem() {
  // query the database for all products
  connection.query("SELECT * FROM products", function(err, results) {
    console.table(results)
    if (err) throw err;
    // once you have the selection, prompt the user for which item they would like to purchase
    inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          buyChoices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "What item would you like to buy?"
        },
        {
          name: "amount",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        // console.log("this is answer: "+answer.choice);
        
        // get the information of the chosen item
        var chosenItem = [];
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.choice) {
            // console.log(answer.choice+"this is choice")
            chosenItem = results[i];
          }
        }
        // console.log(chosenItem.id + "this is chosen item before breaking")
        // determine if there are enough to purchase
        if (chosenItem.stock_quantity >= parseInt(answer.amount)) {
          // there is enough to purchase, so purchase, update DB and back to ask
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenItem.stock_quantity - answer.amount
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Purchase Successful!");
              start();
            }
          );
        }
        else {
          // There isnt enough stock for this item please select another one.
          console.log("Not enough stock, please select another item.");
          start();
        }
      });
  });
}
