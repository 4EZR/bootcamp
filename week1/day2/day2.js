const fs = require('fs')


// fs.writeFileSync('test.txt', 'hello worldb 2')

// const fs = require('fs');

fs.readFile('test.txt', 'utf-8', (err,data) => {
  if (err) throw err;
  console.log(data);
});