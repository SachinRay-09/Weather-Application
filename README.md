# Weather Application

A simple and interactive weather application that allows you to check current weather information for any city.

link - https://weatherapplication-alpha.vercel.app/

## Features

- Search weather information by city name
- View temperature in Celsius and Fahrenheit
- Check humidity, wind speed, and UV index
- Store searched cities in local storage
- Refresh weather data for stored cities
- Delete cities from your saved list

## Setup Instructions

just add your API Key in the url of the fetch request in functions.js file.

### Prerequisites

- A free API key from [WeatherAPI.com](https://www.weatherapi.com/)


### Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd Weather\ application
   ```

2. **Get your API Key**
   - Go to [WeatherAPI.com](https://www.weatherapi.com/)
   - Sign up for a free account
   - Navigate to the API dashboard
   - Copy your API key

3. **Add your API Key**
   - Open `functions.js` file
   - Locate the fetch request URL
   - Replace the placeholder API key with your actual API key

4. **Run the Application**
   - You need to run this through a local web server (required due to browser security)
   
   **Option A: Using Python (if installed)**
   ```bash
   python -m http.server 8000
   ```
   Then open: `http://localhost:8000`

## How to Use the Application

### Adding a City

1. **Open the application** in your browser
2. **Enter a city name** in the input field at the top (e.g., "London", "New York", "Tokyo")
3. **Press Enter** or click the **CHECK** button
4. The application will fetch and display the current weather for that city

### Weather Information Displayed

For each city, you'll see:
- **City Name**: The name of the city
- **State/Region**: The region or state (if applicable)
- **Country**: The country where the city is located
- **Temperature**: Both Celsius and Fahrenheit
- **Humidity**: Current humidity percentage
- **Wind Speed**: Wind speed in kilometers per hour (kph)
- **UV Index**: Current UV radiation index
- **Local Time**: The current time in that location

### Managing Saved Cities

- **Refresh Button**: Updates the weather data for that city
- **Delete Button**: Removes the city from your saved list
- **Local Storage**: All searched cities are automatically saved in your browser's local storage and will appear when you return to the application

### Input Validation

- Only **alphabetic characters and spaces** are accepted in the city name field
- The application will alert you if you enter invalid characters (numbers, symbols, etc.)
- City names are automatically capitalized for consistency

## API Details

The application uses the [WeatherAPI.com](https://www.weatherapi.com/) API to fetch weather data.


## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **API**: WeatherAPI.com
- **Storage**: Browser Local Storage (you may use IndexedDB or other options but generally Local Storage is sufficient for this use case, at most you may store 10-15 cities)

## Future Enhancements

- Add weather forecast (5-day, 10-day)
- Support for more weather metrics
- User authentication and cloud storage
- Dark mode theme
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions, please create an issue in the repository.
