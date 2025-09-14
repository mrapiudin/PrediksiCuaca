# Weather App Configuration

## How to get your OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key
5. Replace `demo_key` in `script.js` line 5 with your actual API key:

```javascript
this.API_KEY = 'your_actual_api_key_here';
```

## API Key Instructions

The app currently runs in demo mode with sample data. To get real weather data:

1. Open `script.js`
2. Find line 5: `this.API_KEY = 'demo_key';`
3. Replace `'demo_key'` with your actual OpenWeatherMap API key
4. Save the file
5. Refresh the webpage

## Features

- Current weather data for any city worldwide
- Temperature, humidity, wind speed, pressure, and visibility
- Responsive design that works on all devices
- Modern UI with custom color palette
- Error handling and loading states
- Demo mode with sample data

## Color Palette

- Primary: #093FB4 (Blue)
- Background: #FFFCFB (Off-white)
- Accent: #FFD8D8 (Light pink)
- Highlight: #ED3500 (Red)

## Technologies Used

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- OpenWeatherMap API
- Responsive design principles