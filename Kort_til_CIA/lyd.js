// Live weather dashboard for Benches using Open-Meteo API
let pillows = [
  { name: "Grønningen", lat: 55.66027925893464, lon: 12.58798331762176 },
  { name: "BenchAarhus", lat: 56.1629, lon: 10.2039 },
  { name: "BenchOdensen", lat: 55.4038, lon: 10.4024 },
  { name: "BenchØsterSø", lat: 56, lon: 4 },
];

let weatherData = [];
let loaded = false;
var windSound;
var amp;

function preload(){
  windSound = loadSound("Sounds/Wind.wav");
}

function loadData() {

  // Fetch current weather for each city
  for (let i = 0; i < pillows.length; i++) {
    let url = "https://api.open-meteo.com/v1/forecast" +
      "?latitude=" + pillows[i].lat +
      "&longitude=" + pillows[i].lon +
      "&current=temperature_2m,wind_speed_10m,relative_humidity_2m" +
      "&wind_speed_unit=ms"+
      "&daily=temperature_2m_max,temperature_2m_min" +
      "&timezone=Europe/Copenhagen&forecast_days=7";

    loadJSON(url,
      function(data) {
        weatherData.push({
          name: pillows[weatherData.length].name,
          temp: data.current.temperature_2m,
          wind: data.current.wind_speed_10m,
          humidity: data.current.relative_humidity_2m,
          maxTemps: data.daily.temperature_2m_max,
          minTemps: data.daily.temperature_2m_min,
          days: data.daily.time
        });

        if (weatherData.length == pillows.length) {
          loaded = true;
            for (let i = 0; i < weatherData.length; i++) {
            console.log(weatherData[i].name, weatherData[i].wind);
          }
        }
      }
    );
  }
}


function setAmplitude(){
  let x = map(weatherData[3].wind,0,10,0,1);
  x = constrain(x,0,1);
  windSound.amp(x);
  console.log("Amplitude:", windSound.amp());
}

