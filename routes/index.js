var express = require('express');
var router = express.Router();
const server = require("https");
let appid = '9a8de4462839e33aa621e40fbf243d79';
let host = process.env.PORT;
require("dotenv").config();

/* GET home page. */
router.get('/', (req, res) => {

  res.render('index', { data: null, error:'' });
  
  });

router.post('/', (req, res) => {

  let cityNames = req.body.citynames;

  //getting open weather endpoint

  const weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${cityNames}&appid=${appid}&units=metric`;

  //requesting data from openWeather Servers

server.get(weatherData, response => {

  response.on('data', data => {
  
  //use try and catch to catch all possible errors
  
  try {
  
  const allWeatherData = JSON.parse(data);
  console.log(allWeatherData)
  
  const imageIcon = allWeatherData.weather[0].icon;
  
  const image = `http://openweathermap.org/img/wn/${imageIcon}@2x.png`;
  
  res.render('index', {
  
  data: allWeatherData,
  
  img: image,
  
  error: null
  
  });
  
  }
  
  catch (e) {
  
    res.render('index', { data: null, error:'Enter a city name to get weather dat' });
    
  }
  
  })
  
  })
  
  });

  module.exports = router;