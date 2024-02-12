import { defineStore } from "pinia"
import { getMiddleSearch } from "../composables/mapsApiCalls"

export const useNearbyInfosStore = defineStore('nearbyInfos', {
    state: () => ({
        nearbyInfo: [],
        nearbyInfoLoading: false,
    }),
    actions: {
        async getNearbyInfo(position, types) {
            this.nearbyInfo = []
            this.nearbyInfoLoading = true
            this.nearbyInfo = await getMiddleSearch(position, types)
            this.nearbyInfoLoading = false
        }
    }
})