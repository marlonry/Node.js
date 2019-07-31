const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // Solution 1 // sending all at once because it was stored everything in a variable

    // fs.readFile('test-file.txt', (err, data) => {  
    //     if (err) console.log(err);
    //     res.end(data);
    // });



    // Solution 2: Streams // sending data in chunks as it is available
    // const readable = fs.createReadStream('testtt-file.txt');

    // readable.on("data", chunk => { // emit event stream data, while sending it chunk by chunk
    //     res.write(chunk);
    // })
    // readable.on("end", () => { // emit event on end -> signal we are done with res.end
    //     res.end(); // res.end needs to be here in order for the data to be sent 
    // })
    // readable.on("error", err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("file not found!"); // problem back pressure cannot send data as fast as it is receiven it
    // });


    // Solution 3: Stream + pipe()
    const readable = fs.createReadStream('testtt-file.txt');
    readable.pipe(res); //readableSource (like data, readable stream) .pipe(writeable Destination) any type of stream inside the pipe method
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening for requests....");
});