require("dotenv").config();
const ct = require('console.table');
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
var productsNameStock = []
var productSales = []
var productID = 0
var purchaseQuantity = 0

function authenticateIdentity() {
    inquire.prompt([
        {
            type: 'list',
            name: 'userInfo',
            message: "Hi there, are you a new or returning user?",
            choices: ['New User', 'Returning User']
        },
        {
            message: 'Please input your Username:\n',
            type: 'input',
            name : 'username'
        },
        {
            message: 'Please input your Password:\n',
            type: 'password',
            name: 'password',
            mask : '*'
        }]).then(answers => {
            let selection = answers.userInfo
            let username = answers.username
            let password = answers.password
    
            if (selection === 'New User') {
                connection.query('INSERT INTO bamazon.userpass (username, pw) VALUES (?, ?);', [username, password], (err, resp) =>{
                    if (err) {
                        throw err
                    }
                    console.log(`Thanks for joining ${username}!\n`)
                    whatToDo();
                    // connection.end()
                })
            }
            else if (selection === 'Returning User') {
                connection.query(`SELECT IF( EXISTS(SELECT * FROM bamazon.userpass WHERE username = ? and pw = ?), 1, 0) AS 'Exist';`, [username, password], (err, resp) => {
                    if (err) {
                        throw err
                    }
                    let exist = resp[0].Exist
                    if (exist === 1) {
                        console.log(`Welcome back ${username}!\n`)
                        whatToDo();
                    }
                    else {
                        console.log(`Your username and/or password does not exist in my database. Please try selecting the "New User" option. \n`)
                        authenticateIdentity();
                    }                    
                })    
            }            
    })
}

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
            runManagerDashboard();
        }
        else if (answer.do === 'Sales Metrics') {
            runSalesMetrics();
        }
    })
}

function tryAgain() {
    inquire.prompt({
        name : 'again',
        type: 'confirm',
        message: 'Would you like to perform another action?',
        default: false
    }).then((resp) => {
        if (resp.again) {
            whatToDo();
        }
        else {
            console.log(`Thank you for your time and business, please come again!`)
            connection.end();
        }
    })
}

function promptViews() {
    return new Promise (resolve => {
        inquire.prompt({
            name: "action",
            type:"list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product"],
            message: "What would you like to do?\n"
        }).then((answer) => {
            if (answer.action === 'View Products for Sale') {
                console.table(products)
                resolve([`Done`]);
            }
            else if (answer.action === 'View Low Inventory') {
                for (let i in products) {
                    if (products[i].Stock <= 5) {
                        console.log(`The item '${products[i].Name}' is low on stock (${products[i].Stock})!`)
                    }
                }
                resolve([`Done`]);
            }
            else if (answer.action === 'Add to Inventory') {
                inquire.prompt([{
                    name:'item',
                    type:'list',
                    choices : productsNameStock,
                    message: `Please select an item to place a purchase order for:\n`                
                    }
                    ,{
                    name: 'restockQuant',
                    type: 'number',
                    message: `How much would you like to restock?`,
                    validate: function(answer) {
                        if (answer > 0) {
                            return true
                        }
                        return `Please select a valid number to restock the item by.`
                    }
                }]).then((answers) => {
                    let id = parseInt(answers.item.match(/Product ID: ([0-9]*) | Product Name:/)[1])
                    let quant = (answers.restockQuant + products[id-1].Stock)
                    resolve([`update`, id, quant])
                })
            }
            else if (answer.action === 'Add New Product') {
                inquire.prompt([{
                        name:'name',
                        type:'input',
                        message: `Please input the item name:\n`                
                    },
                    {
                        name:'department',
                        type:'input',
                        message: `Please input the department the item belongs to:\n`                
                    },
                    {
                        name:'price',
                        type:'number',
                        message: `Please input the price of the item:\n`,
                        validate: function(answer) {
                            if (answer > 0) {
                                return true
                            }
                            return `Please select a valid number to restock the item by.`
                        }              
                    },
                    {
                        name: 'quantity',
                        type: 'number',
                        message: `Please input the quantity of the item to order:`,
                        validate: function(answer) {
                            if (answer > 0) {
                                return true
                            }
                            return `Please select a valid number to restock the item by.`
                        }
                }]).then((a) => {
                    // console.log(a)
                    resolve(['insert', a.name, a.department, a.price, a.quantity])
                    // connection.query(`INSERT INTO bamazon.products (products_name, department_name, price, stock_quantity) VALUES (? ? ? ?);`, [a.name, a.department, a.price, a.quantity], function(err, resp) {                   
                    //     console.log(`Your Item has been added!`)                    
                    // });
                })
            }
        })
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
            products = []
            productsPrompt = []
            productsNameStock = []
            for (let i of resp){
                products.push(i)
                productsPrompt.push(`Product#${i.ProductsID}: '${i.Name}' is on sale at a price of \$${i.Price}. Only ${i.Stock} units remain!`)
                productsNameStock.push(`Product ID: ${i.ProductsID} | Product Name: ${i.Name} | Stock: ${i.Stock}`)
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

function salesViewOption() {
    return new Promise(resolve => {
        inquire.prompt([{
            type: 'list',
            name: 'choice',
            message: "Please select one of the options below:\n",
            choices: ['View Product Sales by Department', 'Create New Department']
        }]).then((answer) => {
            resolve(answer.choice)
        })
    })
}

function getDepartmentInfo() {
    return new Promise (resolve => {
        inquire.prompt([{
            name: 'department',
            type: 'input',
            message: `Please enter the name of the Department:\n`
        },
        {
            name: 'overhead',
            type: 'number',
            message: `Please enter the amount of estimated overhead for the Department:\n`,
            validate: function(answer) {
                if (answer > 0) {
                    return true
                }
                return `Please select a valid number to restock the item by.`
            }  
        }]).then((answers) => {
            resolve([answers.department, answers.overhead])
        })
    })
}

async function runMakePurchase() {
    try {
        //await makeConnection();
        await getItems();
        var choice = await userSelection();
        productID = parseInt(choice.match("Product#(.*):")[1])
        console.log(productID)
        purchaseQuantity = await howManyBuy()
        await placeOrder();
        // console.log(`this runs last`)
        setTimeout(() => {tryAgain();}, 100)
    }
    catch (e) {
        console.error(`An error has occurred: ${e}`)
    }    
}

async function runManagerDashboard() {
    //await makeConnection();
    await getItems();
    var action = await promptViews();
    if (action[0] === 'update') {
        connection.query(`Update bamazon.products SET stock_quantity = ? WHERE productsid = ?;`, [action[2], action[1]], function(err, resp) { 
            if (err) {
                console.log(`Error occurred: ${err}`)
            }          
            console.log(`The item has been restocked!`)                    
        })
    }
    else if (action[0] === 'insert') {
        connection.query("INSERT INTO bamazon.products (products_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?);", [action[1], action[2], action[3], action[4]], function(err, resp) {                   
            if (err) {
                console.log(`Error occurred: ${err}`)
            }
            console.log(connection.state, resp)
            console.log(`Your Item has been added!`)                    
        });
    }
    setTimeout(() => {tryAgain();}, 100)
}

async function runSalesMetrics() {
    //await makeConnection();
    await getItems();
    var choice = await salesViewOption();
    if (choice === 'View Product Sales by Department') {
        connection.query(`SELECT d.department_name AS "Department Name", d.over_head_costs AS "Overhead Costs" , sum(a.price * a.stock_quantity) AS "Profit", sum(a.price * a.stock_quantity) - d.over_head_costs AS "Net Profit"
            FROM bamazon.product_sales a
                JOIN bamazon.products p ON p.productsID = a.productsID
                RIGHT JOIN bamazon.departments d ON d.department_name = p.department_name
            Group By p.department_name;`, function(err, resp) {
            if (err) throw err;
            
            productSales = []
            for (let i of resp){
                productSales.push(i)
            }
            console.clear()
            console.table(productSales)      
        })
    }
    else if (choice === 'Create New Department') {
        resp = await getDepartmentInfo();
        connection.query(`INSERT INTO bamazon.departments (department_name, over_head_costs) VALUES (?, ?);`, [resp[0], resp[1]], function(err, resp) {
            if (err) throw err;
            console.log(`Your department was added!`)
        })
    }
    
    setTimeout(() => {tryAgain();}, 100)
}

authenticateIdentity();

// whatToDo();

