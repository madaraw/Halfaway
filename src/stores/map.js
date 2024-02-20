import { defineStore } from "pinia"
import { Loader } from "@googlemaps/js-api-loader"

export const useMapStore = defineStore('map', {
    state: () => ({
        map: null,
        mapCenter: null,
        loader: new Loader({
            apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
            version: "weekly",
        }),
        initialMarkers: {
            firstFieldMarker: null,
            secondFieldMarker: null,
            halfwayMarker: null
        },
        nearbySearchCircle: null,
        nearbyEstablishmentsMarker: [],
        createSingleMarker: null,
        panMap: null,
        createNearbyCircle: null,
    }),
    actions: {
        createMap() {
            this.loader.load().then(async () => {
                const { Map } = await google.maps.importLibrary("maps");
                const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
                const map = new Map(document.getElementById("map"), {
                    center: this.mapCenter,
                    zoom: 10,
                    disableDefaultUI: true,
                    mapId: import.meta.env.VITE_GOOGLE_MAP_ID
                });
                this.createSingleMarker = (position, customPinParams = null) => {
                    if (!customPinParams)
                        return new AdvancedMarkerElement({
                            position,
                            map
                        })
                    const customPin = new PinElement(customPinParams)
                    return new AdvancedMarkerElement({
                        position,
                        map,
                        content: customPin.element
                    })
                }
                this.panMap = (position, zoom) => {
                    map.panTo(position)
                    map.setZoom(zoom)
                }
                this.createNearbyCircle = (center, range) => {
                    return new google.maps.Circle({
                        strokeColor: "#4205fa",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#4205fa",
                        fillOpacity: 0.35,
                        map,
                        center,
                        radius: range,
                    });
                }
                this.map = map
            })
        },
        createInitialMarkers(places, range, nearbyInfos) {
            this.initialMarkers = {
                firstFieldMarker: null,
                secondFieldMarker: null,
                halfwayMarker: null
            }
            this.nearbySearchCircle = null
            this.initialMarkers.firstFieldMarker = this.createSingleMarker(places.firstLatLng)
            this.initialMarkers.secondFieldMarker = this.createSingleMarker(places.secondLatLng)
            this.initialMarkers.halfwayMarker = this.createSingleMarker(places.halfwayLatLng, {
                background: "#0542fa",
                borderColor: "#4205fa",
                glyphColor: "#4205fa"
            })
            this.nearbySearchCircle = this.createNearbyCircle(places.halfwayLatLng, range)
            this.panMap(places.halfwayLatLng, 14)
        },
        createNearbyEstablishmentsMarkers(nearbyInfos) {
            nearbyInfos.forEach(info => {
                let markerParams
                if (info.primaryType == "coffee_shop" || info.primaryType == "cafe")
                    markerParams = {
                        background: "#fa0542",
                        borderColor: "#af032e",
                        glyphColor: "#af032e"
                    }
                else
                    markerParams = {
                        background: "#05fabd",
                        borderColor: "#03af84",
                        glyphColor: "#03af84"
                    }
                markerParams.scale = 0.8
                this.nearbyEstablishmentsMarker.push(this.createSingleMarker({ lat: info.location.latitude, lng: info.location.longitude }, markerParams))
            })
        }
    }
})