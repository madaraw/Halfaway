export const formatLatLng = (places) => {
    const latLngs = {
        first: places.firstField.geometry ? places.firstField.geometry.location.toJSON() : {
            lat: places.firstField.location.latitude,
            lng: places.firstField.location.longitude
        },
        second: places.secondField.geometry ? places.secondField.geometry.location.toJSON() : {
            lat: places.secondField.location.latitude,
            lng: places.secondField.location.longitude
        }
    }
    return {
        firstLatLng: latLngs.first,
        secondLatLng: latLngs.second,
        halfwayLatLng: {
            lat: (latLngs.first.lat + latLngs.second.lat) / 2,
            lng: (latLngs.first.lng + latLngs.second.lng) / 2
        }
    }
}