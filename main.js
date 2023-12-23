latitude = -32.0728379;
longitude = -52.1687589;
zoom = 19;
document.getElementById("latitude").innerHTML = latitude;
document.getElementById("longitude").innerHTML = longitude;
var map = L.map('map').setView([latitude,longitude], zoom);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© Esri',
    maxZoom: 30,
}).addTo(map);
L.control.layers({
    'Satélite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri'
    }),
    'Mapa': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    })
}).addTo(map);

omnivore.kml('./areac3-kml.kml').addTo(map);
omnivore.kml('./log-campus-Vagner.kml').addTo(map);
omnivore.kml('./nmea-sem-time-stamp.kml').addTo(map);
omnivore.kml('./lago-furg.kml').addTo(map);

function AtualizarCoordenadas() {
    var center = map.getCenter();
    document.getElementById("latitudeAtual").innerHTML = center.lat;
    document.getElementById("longitudeAtual").innerHTML = center.lng;
}

function onMapClick(e) {
    L.popup()
        .setLatLng(e.latlng)
        .setContent("Clickou em " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
map.on('move', AtualizarCoordenadas);

// cada clique passar as coordenadas para um array e depois salvar em um arquivo .kml e ter os poligonos salvos georeferenciados