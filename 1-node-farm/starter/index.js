const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceHTML = require('./modules/replaceTemplate');

//Blocking Syncronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8'); // args: name of the file and file encoding
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("File Written");

//Non-blocking asyncrhonous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log('Error');

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (error) => {
//                 console.log('your file has been written');
//             });
//         });
//     });
// });

// console.log('reading file...');

// FUNCTIONS

// SYNCRONOUS CODE ONLY EXECURED ONCE AT THE BEGINNING
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

console.log(slugify('Fresh', {
  lower: true
})); // showing a normal text instead of the query  example: show fresh instead of ?id=123-fresh 
// SERVER
const server = http.createServer((req, res) => {
  console.log(req.url); // gets the url
  const {
    query,
    pathname
  } = url.parse(req.url, true); // parses url out of the browser and sends destructures the query and the pathname

  // OVERVIEW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    const cardsHtml = dataObj.map(el => replaceHTML(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // PRODUCT PAGE
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    const product = dataObj[query.id];
    const output = replaceHTML(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>page not found</h1>');
  }

  res.end('Hello from the server!'); // res.end to output a simple text on the server send response
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
}); // port, subsaddress on a host, local host, callback function