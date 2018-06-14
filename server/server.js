const path = require('path');
const express = require('express');

// Initialize Express server.
const app = express();
// Set up server port.
const port = process.env.PORT || 3000;

const publicPath = path.resolve(__dirname, '..', 'dist');

app.use(express.static(publicPath));

// Respond with index.html when a GET request is made.
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Listens for connections on the specified port.
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
