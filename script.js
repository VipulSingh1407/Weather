const API_KEY = '933d977b2c4b0eb4bb5122e03af3faa1'; 
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorDisplay = document.getElementById('errorDisplay');
const unitToggle = document.getElementById('unitToggle');
const getLocationWeather = document.getElementById('getLocationWeather');
const weatherVideo = document.getElementById('weatherVideo');
const videoSource = document.getElementById('videoSource');

let isCelsius = true;


function fetchWeather(city) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}&q=${city}`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error('City not found'));
      }
    };
    xhr.onerror = () => reject(new Error('Error fetching data'));
    xhr.send();
  });
}


function updateWeatherUI(data) {
  const { name, main, weather } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const temp = isCelsius ? main.temp : (main.temp * 9/5 + 32).toFixed(2);
  const unit = isCelsius ? '°C' : '°F';


  changeBackgroundVideo(weather[0].main);

  weatherDisplay.innerHTML = `
    <h2>${name}</h2>
    <img src="${iconUrl}" alt="${weather[0].description}">
    <p>Temperature: ${temp}${unit}</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Condition: ${weather[0].main}</p>
  `;
  errorDisplay.textContent = '';
}


function changeBackgroundVideo(condition) {
  let videoUrl = '';

  switch (condition.toLowerCase()) {
    case 'clear':
      videoUrl = 'clear.mp4'; 
      break;
    case 'clouds':
      videoUrl = 'cloudy.mp4'; 
      break;
    case 'rain':
      videoUrl = 'rainy.mp4'; 
      break;
    default:
      videoUrl = 'clear.mp4'; 
  }

  videoSource.src = videoUrl;
  weatherVideo.load();
  weatherVideo.play();
}


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    fetchWeather(city)
      .then(updateWeatherUI)
      .catch((error) => {
        weatherDisplay.innerHTML = '';
        errorDisplay.textContent = error.message;
      });
  } else {
    errorDisplay.textContent = 'Please enter a city name.';
  }
});

unitToggle.addEventListener('click', () => {
  isCelsius = !isCelsius;
  unitToggle.textContent = isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius';
  const tempElement = document.querySelector('.weather-display p');
  if (tempElement) {
    const temp = parseFloat(tempElement.textContent.split(' ')[1]);
    const newTemp = isCelsius ? (temp - 32) * 5/9 : temp * 9/5 + 32;
    tempElement.textContent = `Temperature: ${newTemp.toFixed(2)}${isCelsius ? '°C' : '°F'}`;
  }
});

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`${API_URL}&lat=${latitude}&lon=${longitude}`)
          .then((response) => response.json())
          .then(updateWeatherUI)
          .catch((error) => {
            errorDisplay.textContent = 'Error fetching weather data.';
          });
      },
      (error) => {
        errorDisplay.textContent = 'Geolocation error: ' + error.message;
      }
    );
  } else {
    errorDisplay.textContent = 'Geolocation is not supported by your browser.';
  }
};
getLocationWeather.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`${API_URL}&lat=${latitude}&lon=${longitude}`)
          .then((response) => response.json())
          .then(updateWeatherUI)
          .catch((error) => {
            errorDisplay.textContent = 'Error fetching weather data.';
          });
      },
      (error) => {
        errorDisplay.textContent = 'Geolocation error: ' + error.message;
      }
    );
  } else {
    errorDisplay.textContent = 'Geolocation is not supported by your browser.';
  }
});
