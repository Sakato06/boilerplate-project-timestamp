// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api/:date?",function(req, res) {
  const dateStr = req.params.date;
  const date = (new Date(dateStr).valueOf())
        ? new Date(dateStr)
        : new Date(parseInt(dateStr));

    if (Number.isNaN(date.valueOf()) && dateStr !== undefined) {
        res.json({ error: "Invalid Date" });
    } else {
        if(dateStr !== undefined)
          res.json({ unix: Date.parse(date), utc: new Date(date).toUTCString() });
        else
          res.json({ unix: Date.parse(new Date()), utc: new Date().toUTCString()});
    }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
