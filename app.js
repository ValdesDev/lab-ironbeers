const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", async (req, res) => {
  let beers = await punkAPI.getBeers()
  res.render("beers",{beers});
});

app.get("/random-beer",async (req, res)=>{
  let randomBeerList = await punkAPI.getRandom();
  let randomBeer = randomBeerList[0];
  res.render("random-beer",randomBeer);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
