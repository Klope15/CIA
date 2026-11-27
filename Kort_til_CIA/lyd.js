// Live weather dashboard for Benches using Open-Meteo API
let pillows = [
  { name: "Grønningen", lat: 55.66027925893464, lon: 12.58798331762176 },
  { name: "Fields", lat: 56.1629, lon: 10.2039 },
  { name: "Busstop", lat: 55.641975834404555, lon: 12.590878594965387 },
  { name: "BenchØsterSø", lat: 56, lon: 4 },
];

let weatherData = [];

let loaded = false;
var windSound;
var busSound;
var shoppingSound;
var amp;

function preload(){
  windSound = loadSound("Sounds/Wind.wav");
  busSound = loadSound("Sounds/Bus.wav");
  shoppingSound = loadSound("Sounds/Shopping.wav");
}

function loadWeatherData() {

  // Fetch current weather for each city
  for (let i = 0; i < pillows.length; i++) {
    let url = "https://api.open-meteo.com/v1/forecast" +
      "?latitude=" + pillows[i].lat +
      "&longitude=" + pillows[i].lon +
      "&current=temperature_2m,wind_speed_10m,relative_humidity_2m" +
      "&wind_speed_unit=ms"+
      "&daily=temperature_2m_max,temperature_2m_min" +
      "&timezone=Europe/Copenhagen&forecast_days=7";
      "&models=met_nordic"

    loadJSON(url,
      function(data) {
           weatherData[i] = {
          name: pillows[i].name,
          temp: data.current.temperature_2m,
          wind: data.current.wind_speed_10m,
          humidity: data.current.relative_humidity_2m,
          maxTemps: data.daily.temperature_2m_max,
          minTemps: data.daily.temperature_2m_min,
          days: data.daily.time
        };

        if (weatherData.length == pillows.length) {
          loaded = true;
            for (let i = 0; i < weatherData.length; i++) {
            console.log(weatherData[i].name, weatherData[i].wind);
          }
         console.log("objekter i vejrdata: ",weatherData.length);
        }
      }
    );
  }
}


function setAmplitude(){
  if (!loaded || !weatherData[valgt-1]) return; // Ensure weather data is loaded before proceeding
  let x = map(weatherData[valgt-1].wind,0,10,0,1);
  x = constrain(x,0,1);
  windSound.amp(x);
}

