// Real-time weather using Open-Meteo (free, no API key needed)
const WEATHER_CODES = {
    0: { label: 'Clear', icon: 'sun' },
    1: { label: 'Mostly Clear', icon: 'sun' },
    2: { label: 'Partly Cloudy', icon: 'cloud-sun' },
    3: { label: 'Overcast', icon: 'cloud' },
    45: { label: 'Foggy', icon: 'cloud-fog' },
    48: { label: 'Icy Fog', icon: 'cloud-fog' },
    51: { label: 'Light Drizzle', icon: 'cloud-drizzle' },
    53: { label: 'Drizzle', icon: 'cloud-drizzle' },
    55: { label: 'Heavy Drizzle', icon: 'cloud-drizzle' },
    61: { label: 'Light Rain', icon: 'cloud-rain' },
    63: { label: 'Rain', icon: 'cloud-rain' },
    65: { label: 'Heavy Rain', icon: 'cloud-rain' },
    71: { label: 'Light Snow', icon: 'snowflake' },
    73: { label: 'Snow', icon: 'snowflake' },
    75: { label: 'Heavy Snow', icon: 'snowflake' },
    80: { label: 'Showers', icon: 'cloud-rain' },
    81: { label: 'Showers', icon: 'cloud-rain' },
    82: { label: 'Heavy Showers', icon: 'cloud-rain' },
    95: { label: 'Thunderstorm', icon: 'cloud-lightning' },
    96: { label: 'Hail Storm', icon: 'cloud-lightning' },
    99: { label: 'Hail Storm', icon: 'cloud-lightning' },
};

export const getWeather = async () => {
    try {
        // Get user's location
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 5000,
                maximumAge: 300000 // cache for 5 minutes
            });
        });

        const { latitude, longitude } = position.coords;

        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`
        );
        const data = await res.json();

        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code;
        const info = WEATHER_CODES[code] || { label: 'Weather', icon: 'cloud' };

        return { temp, label: info.label, icon: info.icon, error: null };
    } catch (err) {
        return { temp: null, label: 'Weather', icon: 'cloud', error: err.message };
    }
};
