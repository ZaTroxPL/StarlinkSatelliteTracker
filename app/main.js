const getStarlinkData = async () => {
    const responseStarlink = await fetch('https://api.spacexdata.com/v4/starlink');
    const responseLaunches = await fetch('https://api.spacexdata.com/v4/launches');
    const starlinkData = await responseStarlink.json();
    const launchesData = await responseLaunches.json();

    var result = starlinkData.filter(satellite => satellite.longitude != null && satellite.latitude != null)

    var markers = [];

    result.forEach(function (satellite) {
        var launchData = launchesData.filter(launch => launch.id == satellite.launch)

        var marker = new google.maps.Marker({
            position: { lat: satellite.latitude, lng: satellite.longitude },
            map: window.map//,
            //label: satellite.spaceTrack.OBJECT_NAME.split("STARLINK-")[1]
        });

        var contentString = 
        "<div id='content'>" +
        "<div id='sideNotice'>" +
        "</div>" + 
        "<h1 id='firstHeading' class='firstHeading'>" + satellite.spaceTrack.OBJECT_NAME + "</h1>" +
        "<div id='bodyContent'>" + 
        "<p>" + launchData[0].details + "</p>" +
        "<p><a href='" + launchData[0].links.webcast + "' target='_blank'>Watch Launch Video Here</a></p>"
        "</div>" +
        "</div>";

        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        })

        marker.addListener("click", () => {
            infoWindow.open(window.map, marker);
        });

        markers.push(marker);
    });

    var markerCluster = new MarkerClusterer(window.map, markers,
        { imagePath: `../images/m` });
}


function initMap() {
    window.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 1,
        center: { lat: 0, lng: 0 },
    });
}