const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const storyRoutes = require('./api/storyRouter');
const errorHandler = require('./api/errorHandler');

const app = express();
const port = process.env.PORT || 8900;

//middlewares to format request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middlewares to set static path for public folder
app.use(express.static(path.join(__dirname, "public")));

//middlewares to set view engine to render .ejs files as html
app.set('view engine', 'ejs');

//middlewares to handel menthods and setup CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Authosization");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.sendStatus(200);
  }
  next();
});

//story router for our app
app.use('/story', storyRoutes);

//if no matching routes found handle error
errorHandler(app);

//start app server
app.listen(port, () => {
  console.log(`Multi-Path story app listening at :${port}`);
})
