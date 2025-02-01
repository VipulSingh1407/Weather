# Weather App  

This is a simple weather application that fetches weather data from the OpenWeatherMap API. It allows users to check the weather of any city and also fetches the weather for their current location by default.  

## Features  
- Fetch weather details by entering a city name.  
- Automatically fetch weather data for the user's current location.  
- Toggle temperature between Celsius and Fahrenheit.  
- Dynamic background video based on weather conditions.  

## Technologies Used  
- HTML  
- CSS  
- JavaScript  
- OpenWeatherMap API  

## Installation and Setup  

### Prerequisites  
- A modern web browser.  
- An active internet connection.  
- An OpenWeatherMap API key.  

### Steps to Run Locally  
1. Clone the repository:  
   ```sh  
   git clone https://github.com/VipulSingh1407/Weather.git
   ```
2. Navigate to the project directory:  
   ```sh  
   cd weather-app  
   ```
3. Open the `index.html` file in your browser.  

## Usage Instructions  
- The weather for your current location is fetched automatically when the page loads.  
- To check the weather of another city, enter the city name in the input box and click the "Fetch Weather" button.  
- Click the "Get Current Location Weather" button to fetch weather based on your current GPS location.  
- Use the "Switch to Fahrenheit/Celsius" button to toggle temperature units.  

## Challenges Faced and Solutions  

### 1. Fetching Weather for Current Location Automatically  
**Challenge:** Initially, the weather data was only fetched when clicking the "Get Current Location Weather" button.  
**Solution:** Implemented the `navigator.geolocation.getCurrentPosition()` function inside a `window.onload` event to fetch location-based weather automatically when the page loads.  

### 2. Handling API Errors  
**Challenge:** The app would break when an invalid city was entered.  
**Solution:** Added error handling to display a message when an incorrect city is entered or when the API request fails.  

### 3. Background Video Change Based on Weather  
**Challenge:** Needed to dynamically change the background video based on weather conditions.  
**Solution:** Used a `switch` statement to update the video source based on weather conditions such as "Clear," "Clouds," and "Rain."  

## Future Improvements  
- Add more weather conditions and corresponding videos.  
- Improve UI/UX with better animations and transitions.  
- Implement a forecast feature for upcoming days.  

## License  
This project is open-source and available under the MIT License.  
