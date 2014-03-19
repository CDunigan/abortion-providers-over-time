
var width = $(window).width();

var mapZoom = 6;
var mapCenter = [31.35, -99.64];

if(width < 767) {
  mapZoom = 5;
}
var map = L.mapbox.map('map', 'texastribune.map-9p13mpmk', {
    minZoom: 5,
    maxZoom: 11,
    scrollWheelZoom: false
}).setView(mapCenter, mapZoom);


map.zoomControl.setPosition('topright');

var augustLayer = L.mapbox.gridLayer('texastribune.AbortionFacilities3_17_14');
var nowLayer = L.mapbox.gridLayer('texastribune.AbortionFacilities3_17_14_Now');
var ascLayer = L.mapbox.gridLayer('texastribune.AbortionFacilities3_17_14ASC');

map.addLayer(augustLayer);
map.addControl(L.mapbox.gridControl(augustLayer, {follow: true}));

var tilelayers = {
	"<div class='control-layer'>Aug. 2013</div>": L.mapbox.tileLayer('texastribune.AbortionFacilities3_17_14').addTo(map),
    "<div class='control-layer'>March 2014</div>": L.mapbox.tileLayer('texastribune.AbortionFacilities3_17_14_Now'),
    "<div class='control-layer'>Sept. 2014</div>": L.mapbox.tileLayer('texastribune.AbortionFacilities3_17_14ASC')
};

L.control.layers(tilelayers, null, {collapsed: false, position: 'topleft'}).addTo(map);

map.on('baselayerchange', function(e) {
	if (e.name === "<div class='control-layer'>Aug. 2013</div>") {
		map.removeLayer(nowLayer);
		map.removeLayer(ascLayer);
		map.addLayer(augustLayer);
		map.addControl(L.mapbox.gridControl(augustLayer, {follow: true}));
	} else if (e.name === "<div class='control-layer'>March 2014</div>") {
		map.removeLayer(augustLayer);
		map.removeLayer(ascLayer);
		map.addLayer(nowLayer);
		map.addControl(L.mapbox.gridControl(nowLayer, {follow: true}));
	} else {
		map.removeLayer(nowLayer);
		map.removeLayer(augustLayer);
		map.addLayer(ascLayer);
		map.addControl(L.mapbox.gridControl(ascLayer, {follow: true}));
	}

});
