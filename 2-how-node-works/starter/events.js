const EventEmitter = require('events');
const http = require('http');

// extend from the even emitter to acess all the methods in the event emitter
class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales(); // subscribe and then react

myEmitter.on('newSale', () => { // observer
    console.log('There was a new sale!!!');
});

myEmitter.on('newSale', () => { // observer
    console.log("Costumer name: Jonas!!!");
});

myEmitter.on('newSale', stock => { // observer
    console.log(`There are now ${stock} items left in stock`);
})

myEmitter.emit('newSale', 9); // emits events // event register and then arguments for the observer to use

// runs syncronously

/////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => { // observer and call back function is passed

    console.log(req.url);

    console.log('Request Received!');
    res.end('Request Received');
})
server.on('request', (req, res) => { //other observer listening to more events
    console.log('Another Request :D');
})
server.on('close', () => {
    console.log("Server closed");
})

server.listen(8000, '127.0.0.1', () => { // another observer
    console.log('Waiting for incoming request...');
});