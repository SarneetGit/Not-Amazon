// myString = `Product#10: 'Colgate 360 Sensitive Pro Relief' is on sale at a price of $10. Only 25 units remain!`
// console.log(myString.match(/# (.*?) :/g)

var test = `Product#10: 'Colgate 360 Sensitive Pro Relief' is on sale at a price of $10. Only 25 units remain!`;

var testRE = test.match("Product#(.*):")[1];

var str = "My cow always gives milk";
str.match(/cow(.*)milk/)[1]

console.log(str.match(/cow(.*)milk/)[1])