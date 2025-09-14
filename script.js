// Weather App JavaScript
class WeatherApp {
    constructor() {
        // OpenWeatherMap API key (demo key - users should replace with their own)
        this.API_KEY = 'demo_key'; // Users need to replace this with their actual API key
        this.API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
        
        this.initializeElements();
        this.bindEvents();
        this.showDemoMessage();
    }

    initializeElements() {
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.defaultCityBtn = document.getElementById('defaultCityBtn');
        this.loadingState = document.getElementById('loadingState');
        this.errorState = document.getElementById('errorState');
        this.errorMessage = document.getElementById('errorMessage');
        this.weatherDisplay = document.getElementById('weatherDisplay');
        
        // Weather data elements
        this.cityName = document.getElementById('cityName');
        this.countryName = document.getElementById('countryName');
        this.temperature = document.getElementById('temperature');
        this.weatherCondition = document.getElementById('weatherCondition');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
        this.visibility = document.getElementById('visibility');
    }

    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        this.defaultCityBtn.addEventListener('click', () => this.loadDefaultCity());
    }

    showDemoMessage() {
        // Show a demo message since we don't have a real API key
        this.showError('Demo Mode: Please add your OpenWeatherMap API key to script.js. Showing sample data for Jakarta...');
        setTimeout(() => {
            this.loadSampleData();
        }, 2000);
    }

    async handleSearch() {
        const city = this.cityInput.value.trim();
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        if (this.API_KEY === 'demo_key') {
            this.showDemoWeather(city);
            return;
        }

        await this.fetchWeatherData(city);
    }

    async fetchWeatherData(city) {
        this.showLoading();
        
        try {
            const url = `${this.API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`;
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please check the spelling and try again.');
                } else if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
                } else {
                    throw new Error('Failed to fetch weather data. Please try again later.');
                }
            }
            
            const data = await response.json();
            this.displayWeatherData(data);
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    showDemoWeather(city) {
        this.showLoading();
        
        // Simulate API call delay
        setTimeout(() => {
            const demoData = this.generateDemoData(city);
            this.displayWeatherData(demoData);
            this.hideLoading();
        }, 1000);
    }

    generateDemoData(city) {
        const conditions = ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'shower rain', 'rain', 'thunderstorm', 'snow', 'mist'];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        const baseTemp = Math.floor(Math.random() * 20) + 15; // 15-35°C
        
        return {
            name: city.charAt(0).toUpperCase() + city.slice(1),
            sys: { country: 'ID' },
            main: {
                temp: baseTemp,
                feels_like: baseTemp + Math.floor(Math.random() * 5) - 2,
                humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
                pressure: Math.floor(Math.random() * 50) + 1000 // 1000-1050 hPa
            },
            weather: [{
                main: randomCondition.split(' ')[0],
                description: randomCondition
            }],
            wind: {
                speed: Math.floor(Math.random() * 10) + 1 // 1-10 m/s
            },
            visibility: Math.floor(Math.random() * 5000) + 5000 // 5000-10000 m
        };
    }

    loadSampleData() {
        const jakartaData = {
            name: 'Jakarta',
            sys: { country: 'ID' },
            main: {
                temp: 28,
                feels_like: 32,
                humidity: 75,
                pressure: 1012
            },
            weather: [{
                main: 'Clouds',
                description: 'scattered clouds'
            }],
            wind: {
                speed: 3.5
            },
            visibility: 8000
        };
        
        this.displayWeatherData(jakartaData);
    }

    loadDefaultCity() {
        this.cityInput.value = 'Jakarta';
        this.handleSearch();
    }

    displayWeatherData(data) {
        this.hideError();
        
        // Update weather information
        this.cityName.textContent = data.name;
        this.countryName.textContent = data.sys.country;
        this.temperature.textContent = `${Math.round(data.main.temp)}°C`;
        this.weatherCondition.textContent = data.weather[0].description;
        this.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${data.wind.speed} m/s`;
        this.pressure.textContent = `${data.main.pressure} hPa`;
        this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        
        // Apply weather-based styling
        this.applyWeatherStyling(data.weather[0].main.toLowerCase());
        
        // Show weather display with animation
        this.weatherDisplay.classList.remove('hidden');
        this.weatherDisplay.classList.add('fade-in');
        
        // Clear search input
        this.cityInput.value = '';
    }

    applyWeatherStyling(condition) {
        const weatherHeader = this.weatherDisplay.querySelector('.weather-header');
        
        if (weatherHeader) {
            // Remove existing weather classes
            weatherHeader.classList.remove('weather-clear', 'weather-clouds', 'weather-rain', 'weather-snow');
            
            // Apply condition-based styling
            switch (condition) {
                case 'clear':
                    weatherHeader.classList.add('weather-clear');
                    break;
                case 'clouds':
                    weatherHeader.classList.add('weather-clouds');
                    break;
                case 'rain':
                case 'drizzle':
                case 'thunderstorm':
                    weatherHeader.classList.add('weather-rain');
                    break;
                case 'snow':
                    weatherHeader.classList.add('weather-snow');
                    break;
                default:
                    // Keep default gradient
                    break;
            }
        }
    }

    showLoading() {
        this.hideError();
        this.weatherDisplay.classList.add('hidden');
        this.loadingState.classList.remove('hidden');
        this.searchBtn.disabled = true;
        this.searchBtn.textContent = 'Searching...';
    }

    hideLoading() {
        this.loadingState.classList.add('hidden');
        this.searchBtn.disabled = false;
        this.searchBtn.textContent = 'Search Weather';
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorState.classList.remove('hidden');
        this.weatherDisplay.classList.add('hidden');
    }

    hideError() {
        this.errorState.classList.add('hidden');
    }
}

// Initialize the weather app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Add some utility functions for enhanced UX
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);