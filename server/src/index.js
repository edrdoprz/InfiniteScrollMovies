var express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.sendFile('app/index.html', {
    root: '../'
  });
});

app.get('*.css', (req, res) => {
  res.sendFile('app' + req.url, {
    root: '../'
  });
});

app.get('*.js', (req, res) => {
  res.sendFile('app' + req.url, {
    root: '../'
  });
});

app.get('*.html', (req, res) => {
  res.sendFile('app' + req.url, {
    root: '../'
  });
});

app.listen(8080);
console.log('App listening on port 8080');
