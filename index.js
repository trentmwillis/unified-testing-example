const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => res.sendFile(path.resolve('./index.html')));
app.get('*', express.static('.'));

app.listen(8000, function () {
  console.log('Visit the Unified Testing Example application at http://localhost:8000');
});
