export const getMiddleSearch = async (location, types) => {
    const res = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_API_KEY,
            'X-Goog-FieldMask': 'places.displayName,places.location,places.formattedAddress,places.rating,places.currentOpeningHours'
        },
        body: JSON.stringify({
            'includedTypes': types,
            'locationRestriction': {
                'circle': {
                    'center': {
                        'latitude': location.lat,
                        'longitude': location.lng
                    },
                    'radius': 500
                }
            }
        })
    });
    return await res.json();
};

export const fetchPlace = async (query) => {
    const res = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_API_KEY,
            'X-Goog-FieldMask': 'places.displayName,places.addressComponents,places.location'
        },
        body: JSON.stringify({
            'textQuery': query
        })
    });
    return await res.json();
};

export const getIpGeo = async () => {
    let res = await fetch('http://ipinfo.io/json?token=d7e1be900b762e')
    return await res.json()
}