const getStarlinkData = async () => {
    const response = await fetch('https://api.spacexdata.com/v4/starlink');
    const myJson = await response.json();

    var result = myJson.filter(satellite => satellite.longitude != null && satellite.latitude != null)

    var markers = [];

    result.forEach(function (satellite) {
        var marker = new google.maps.Marker({
            position: { lat: satellite.latitude, lng: satellite.longitude },
            map: window.map,
            label: satellite.spaceTrack.OBJECT_NAME
        });

        markers.push(marker);
    });

    var markerCluster = new MarkerClusterer(window.map, markers,
        { imagePath: `./images/m` });
}


function initMap() {
    window.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 1,
        center: { lat: 0, lng: 0 },
    });
}