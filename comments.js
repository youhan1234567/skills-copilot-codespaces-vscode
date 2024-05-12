// Create web server
// 1. Load the express module
// 2. Create an express application
// 3. Create a GET route for /comments
// 4. Create a POST route for /comments
// 5. Start the server on port 3000

// 1. Load the express module
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// 2. Create an express application
const app = express();

// 3. Create a GET route for /comments
app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred');
      return;
    }
    res.send(JSON.parse(data));
  });
});

// 4. Create a POST route for /comments
app.use(bodyParser.json());
app.post('/comments', (req, res) => {
  if (!req.body || !req.body.name || !req.body.comment) {
    res.status(400).send('Invalid request');
    return;
  }
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred');
      return;
    }
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('An error occurred');
        return;
      }
      res.send('Comment added');
    });
  });
});

// 5. Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// Run the server with node comments.js
// Access the server on http://localhost:3000
// Test the GET and POST routes
// Use curl or Postman to test the POST route
// curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice","comment":"Hello"}' http://localhost:3000/comments
// curl http://localhost:3000/comments
// The server should return the comment that was added

// Add error handling to the server
// Add validation to the POST route to check if the request body contains