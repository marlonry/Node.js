const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' }); //json method defines the contenttype unlike node.js which we have to send the content type
});

app.post('/', (req, res) => {
  res.send('You can now post to this endpoint');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
