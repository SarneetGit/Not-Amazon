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

function test() {
    return new Promise(resolve => {
        inquire.prompt([{
            type: 'list',
            name: 'product',
            message: "What would you like to bid?",
            choices: productsPrompt
        }]).then((answer) => {
            console.log(answer.product)
            resolve()
        })
    })
}

async function run() {
    await makeConnection();
    await getItems();
    await test();
    console.log(`this runs last`)
    connection.end()
    
}

run()

//     console.log(resp)
// })
