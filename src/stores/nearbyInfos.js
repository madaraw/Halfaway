import { defineStore } from "pinia"
import { getMiddleSearch } from "../composables/mapsApiCalls"

export const useNearbyInfosStore = defineStore('nearbyInfos', {
    state: () => ({
        nearbyInfo: [],
    }),
    actions: {
        async getNearbyInfo(position, types) {
            this.nearbyInfo = await getMiddleSearch(position, types)
        }
    }
})