// Live weather dashboard for Benches using Open-Meteo API
let cities = [
  { name: "BenchCPH", lat: 55.6761, lon: 12.5683 },
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

function setup() {
  createCanvas(500, 420);
  amp = new p5.Amplitude();

  // Fetch current weather for each city
  for (let i = 0; i < cities.length; i++) {
    let url = "https://api.open-meteo.com/v1/forecast" +
      "?latitude=" + cities[i].lat +
      "&longitude=" + cities[i].lon +
      "&current=temperature_2m,wind_speed_10m,relative_humidity_2m" +
      "&wind_speed_unit=ms"+
      "&daily=temperature_2m_max,temperature_2m_min" +
      "&timezone=Europe/Copenhagen&forecast_days=7";

    loadJSON(url,
      function(data) {
        weatherData.push({
          name: cities[weatherData.length].name,
          temp: data.current.temperature_2m,
          wind: data.current.wind_speed_10m,
          humidity: data.current.relative_humidity_2m,
          maxTemps: data.daily.temperature_2m_max,
          minTemps: data.daily.temperature_2m_min,
          days: data.daily.time
        });

        if (weatherData.length == cities.length) {
          loaded = true;
            for (let i = 0; i < weatherData.length; i++) {
            console.log(weatherData[i].name, weatherData[i].wind);
          }
        }
      }
    );
  }
}

function draw() {
  background(0,255,0);

  if (windSound.isPlaying()){
    setAmplitude();
  }

}

function mousePressed(){
{
  windSound.play();
  }
}

function setAmplitude(){
  let x = map(weatherData[3].wind,0,10,0,1);
  x = constrain(x,0,1);
  windSound.amp(0.3);
  console.log("Amplitude:", windSound.amp());
}

