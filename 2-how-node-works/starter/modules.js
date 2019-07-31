// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(3, 10));

//exports
const calc2 = require('./test-module-2');
console.log(calc2.add(10, 29));
console.log(calc2.multiply(10, 29));
console.log(calc2.divide(10, 29));

//Caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();