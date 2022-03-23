var express = require('express');
var app = express();
var dayjs = require('dayjs');
const {v4 : uuidv4} = require('uuid');
var axios = require('axios');
var favicon = require('serve-favicon');



// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(__dirname + '/views/pages/')); 

// parse application/json
app.use(express.json());

// render index page
app.get('/', function(req, res) {
    const newId = uuidv4()
    res.cookie("sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
    res.cookie("sessionID", newId, {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: false,
      expires: dayjs().add(1, "days").toDate(),
    });
  res.render('pages/index', {});
});

app.post('/submit', function(req, res) {
  
//write code here to submit /devices request using sessionID

const username = 'f70da198-6faf-49dd-97c9-33bb406a10c8';
const password = 'dcfab6f7-0410-458a-8a34-76c62ad3534f';
const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

axios('https://api.dev.sardine.ai/v2/devices', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${token}`
  },
  data: JSON.stringify(req.body)
})
.then(data => {
  console.log('Success:', data.data);
  return res.end();
})
.catch((error) => {
  console.error('Error:', error.data);
  return res.end();
});


});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
