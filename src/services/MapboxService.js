// Mapbox API Service
// Replace with your actual Mapbox access token
const MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';

/**
 * Geocode an address query → returns array of suggestions
 * Each suggestion: { place_name, center: [lng, lat] }
 */
export const geocodeAddress = async (query) => {
    if (!query || query.length < 3) return [];
    try {
        const encoded = encodeURIComponent(query);
        const res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5&types=address,poi`
        );
        const data = await res.json();
        if (!data.features) return [];
        return data.features.map(f => ({
            place_name: f.place_name,
            center: f.center // [lng, lat]
        }));
    } catch (err) {
        console.error('Geocoding error:', err);
        return [];
    }
};

/**
 * Get directions from origin to destination
 * Returns travel duration in minutes
 * mode: 'driving', 'walking', 'cycling'
 */
export const getDirections = async (originCoords, destCoords, mode = 'driving') => {
    if (!originCoords || !destCoords) return null;
    try {
        const coords = `${originCoords[0]},${originCoords[1]};${destCoords[0]},${destCoords[1]}`;
        const profile = mode === 'walk' ? 'walking' : mode === 'transit' ? 'driving' : 'driving';
        const res = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coords}?access_token=${MAPBOX_TOKEN}&overview=false`
        );
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
            const durationSec = data.routes[0].duration;
            return Math.ceil(durationSec / 60); // minutes
        }
        return null;
    } catch (err) {
        console.error('Directions error:', err);
        return null;
    }
};

export default { geocodeAddress, getDirections };
