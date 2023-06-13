export const fetchParking = (locationParams) => {
    if (locationParams.currLocation) {
        const URL = `https://api.cyclestreets.net/v2/pois.locations?type=cycleparking&longitude=${locationParams.currLocation.longitude}&latitude=${locationParams.currLocation.latitude}&radius=${locationParams.radius}&limit=10`
        return fetch(URL, {
            method: "GET",
            headers: {
                'X-API-KEY': '3c43e5d9434284f2',
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }
}