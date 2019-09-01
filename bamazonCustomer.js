require("dotenv").config();
const inquire = require('inquirer');
const sql = require('mysql');
const login = require("./not-password.js");
const connection = sql.createConnection({
    host: "localhost",
    port: "3306",
    user: login.login['username'],
    password: login.login['password']
});

var products = []
var productsPrompt = []
var productID = 0
var purchaseQuantity = 0

function whatToDo() {
    inquire.prompt({
        name: "do",
        type:"list",
        choices: ["Purchase a product", "Manager Dashboard", "Sales Metrics"],
        message: "Welcome to Not-Amazon Inc. What would you like to do today?\n"
    }).then((answer) => {
        if (answer.do === 'Purchase a product') {
            runMakePurchase();
        }
        else if (answer.do === 'Manager Dashboard') {
            //coming soon
        }
        else if (answer.do === 'Sales Metrics') {
            //coming soon
        }
    })
}

function promptViews() {
    inquire.prompt({
        name: "do",
        type:"list",
        choices: ["Purchase a product", "Manager Dashboard", "Sales Metrics"],
        message: "Welcome to Not-Amazon Inc. What would you like to do today?\n"
    }).then((answer) => {
        if (answer.do === 'Purchase a product') {
            runMakePurchase();
        }
        else if (answer.do === 'Manager Dashboard') {
            runManagerDashboard();
        }
        else if (answer.do === 'Sales Metrics') {
            runSalesMetrics();
        }
    })
}

function makeConnection () {
    return new Promise(resolve => {
        connection.connect((err) => {
            if (err) throw err;
            resolve(connection.state)
        })
    })
}

function getItems () {
    return new Promise(resolve => {
        connection.query(`Select productsid AS "ProductsID", products_name AS "Name", price AS "Price", stock_quantity AS "Stock" from bamazon.products;`, function(err, resp) {
            if (err) throw err;
    
            for (let i of resp){
                products.push(i)
                productsPrompt.push(`Product#${i.ProductsID}: '${i.Name}' is on sale at a price of \$${i.Price}. Only ${i.Stock} units remain!`)
            }
            //console.log(`Product#${products[0].ProductsID}: '${products[0].Name}' is on sale at a price of \$${products[0].Price}. Only ${products[0].Stock} units remain!`)
            // console.log(productsPrompt)
            //connection.end()
            resolve()
        })
    })
}

function userSelection() {
    return new Promise(resolve => {
        inquire.prompt([{
            type: 'list',
            name: 'product',
            message: "Please select the product that you wish to purchase:\n",
            choices: productsPrompt
        }]).then((answer) => {
            resolve(answer.product)
        })
    })
}

function howManyBuy() {
    return new Promise(resolve => {
        inquire.prompt([{
            type: 'number',
            name: 'quantity',
            message: "How many units would you like to buy?",
            validate: function(resp) {
                if (resp > products[productID-1].Stock) {
                    return `Sorry, looks like we do not have enough stock to complete your order.`
                }
                else {
                    return true
                }
            }
        }]).then((answer) => {
            resolve(answer.quantity)
        })
    })
}

function placeOrder() {
    return new Promise (resolve => {
        let i = productID - 1 
        let remainder = products[i].Stock - purchaseQuantity
        connection.query(`UPDATE bamazon.products SET stock_quantity = ? WHERE productsID = ?;`, [remainder, productID], function(err, resp){
            if (err) throw err;
        })
        connection.query(`INSERT INTO bamazon.product_sales (productsid, products_name, price, stock_quantity) 
        VALUES (?, ?, ?, ?);`, [productID, products[i].Name, products[i].Price, purchaseQuantity], function(err, resp) {
            if (err) throw err;
            else {
                console.log(`Your order for ${products[i].Name} has been placed!\nYour total is: \$${products[i].Price * purchaseQuantity}`)
            }
        })
        resolve()
    })
}

async function runMakePurchase() {
    try {
        await makeConnection();
        await getItems();
        var choice = await userSelection();
        productID = parseInt(choice.charAt(8))
        console.log(productID)
        purchaseQuantity = await howManyBuy()
        await placeOrder();
        // console.log(`this runs last`)
        connection.end()
    }
    catch (e) {
        console.error(`An error has occurred: ${e}`)
    }    
}

async function runManagerDashboard() {
    await makeConnection();
    await getItems();
    connection.end()
}

async function runSalesMetrics() {
    await makeConnection();
    await getItems();
    connection.end()
}




whatToDo();
// runMakePurchase()

//     console.log(resp)
// })
