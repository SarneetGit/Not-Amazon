# Not-Amazon
Amazon-like storefront with the MySQL, inquirer, user authentication and more!
___

## Overview
THe command line storefront comes with three main functionalities:

* [**Customer**]
	* allows user to view and purchase products
* [**Manager**]
	* allows user to view, update, add, and remove products
* [**Supervisor**]
	* allows user to view sales metrics on products

___

# Demo

<img src="./media/Demo_Not-Amazon.gif">

___

## Setup
To run this application, you will need [MySQL](https://dev.mysql.com/doc/refman/5.6/en/installing.html) and [Node JS](https://nodejs.org/en/download/) installed on your computer.

#### MySQL Database Setup 
If you do not have MySQL database already set up on your machine, visit the [MySQL installation page](https://dev.mysql.com/doc/refman/5.6/en/installing.html) to install the version you need for your operating system. Once you have MySQL installed, you will be able to create the *Bamazon* database and tables with the SQL code found in [bamazon.sql](bamazon.sql). Run this code inside your MySQL client to populate the database, then you will be ready to proceed with running the Bamazon customer and manager interfaces.

#### Run Application
Once you have the Bamazon database set up, run these commands in the command line:

```
git clone https://github.com/SarneetGit/Not-Amazon.git
cd Bamazon
npm install
node bamazon.js
```
Note: type `node bamazonManager.js` to access the manager portal

___


## Technologies Used
* JavaScript
*  [Node JS](https://nodejs.org/en/download/)
* [MySQL](https://dev.mysql.com/doc/refman/5.6/en/installing.html)
* NPM Packages:
	- [mysql](https://www.npmjs.com/package/mysql)
	- [inquirer](https://www.npmjs.com/package/inquirer)
	- [chalk](https://www.npmjs.com/package/chalk)
	- [cli-table](https://www.npmjs.com/package/cli-table)

