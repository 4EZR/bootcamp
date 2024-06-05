// ! First
console.log("hello world")

// ! Second Validator 
const validator = require('validator');

console.log(validator.isEmail('j@g.com'))
console.log(validator.isMobilePhone('081234567890', 'en-US'));
