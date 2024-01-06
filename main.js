latitude = -32.0728379;
longitude = -52.1687589;
zoom = 18;
let polygonPoints = [];
let polygons = [];

let colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'purple',
    'pink',
    'black',
    'white',
    'gray',
    'brown',
    'cyan',
    'magenta',
    'lime',
    'olive',
    'maroon',
    'navy',
    'aquamarine',
    'turquoise',
    'silver', 
]
document.getElementById("latitude").innerHTML = latitude;
document.getElementById("longitude").innerHTML = longitude;
var map = L.map('map').setView([latitude,longitude], zoom);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
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

function handleMapClickPoint(e) {
    polygonPoints.push(e.latlng);
    for (let i = 0; i < polygonPoints.length; i++) {
        L.polyline(polygonPoints, { color: '#000000' }).addTo(map);
    }
}


function handleMapLeftClick(e) {
    e.originalEvent.preventDefault();
    if (polygonPoints.length < 3) {
        alert("Poligono precisa ter no minimo 3 pontos");
        return;
    }
    do {
        nomePoligono = prompt("Digite o nome do poligono: ");
    } while (nomePoligono == null || nomePoligono == "");
    polygonDetailed = {
        "name": nomePoligono,
        "points": polygonPoints,
        "color": colors[Math.floor(Math.random() * colors.length)]
    } 
    polygons.push(polygonDetailed);
    polygonPoints = [];    
    for (let i = 0; i < polygons.length; i++) {
        L.polygon(polygons[i].points, { color: polygons[i].color }).addTo(map).bindPopup(polygons[i].name);
    }
}


function onMapClick(e) {
    L.popup()
        .setLatLng(e.latlng)
        .setContent("Clickou em " + e.latlng.toString())
        .openOn(map);
}


map.on('click', handleMapClickPoint);
map.on('contextmenu', handleMapLeftClick);
map.on('move', AtualizarCoordenadas);

// cada clique passar as coordenadas para um array e depois salvar em um arquivo .kml e ter os poligonos salvos georeferenciados