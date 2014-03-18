var map = L.mapbox.map('map', 'texastribune.map-9p13mpmk', {
    minZoom: 5,
    maxZoom: 11,
    scrollWheelZoom: false
}).setView([31.35, -99.64], 6)

map.zoomControl.setPosition('topright');

var augustLayer = L.mapbox.gridLayer('texastribune.AbortionFacilities3_17_14');
var nowLayer = L.mapbox.gridLayer('texastribune.AbortionFacilities3_17_14_Now');
var ascLayer = L.mapbox.gridLayer('texastribune.AbortionFacilities3_17_14ASC');

map.addLayer(augustLayer);
map.addControl(L.mapbox.gridControl(augustLayer, {follow: true}));

var tilelayers = {
	"<div id='control-layer'><strong>Aug. 2013</strong> (Before HB 2)</div>": L.mapbox.tileLayer('texastribune.AbortionFacilities3_17_14').addTo(map),
    "<div id='control-layer'><strong>March 2014</strong></div>": L.mapbox.tileLayer('texastribune.AbortionFacilities3_17_14_Now'),
    "<div id='control-layer'><strong>Sept. 2014</strong> (With Surgical Center Rules)</div>": L.mapbox.tileLayer('texastribune.AbortionFacilities3_17_14ASC')
};

L.control.layers(tilelayers, null, {collapsed: false, position: 'topleft'}).addTo(map);

map.on('baselayerchange', function(e) {
	if (e.name === "<div id='control-layer'><strong>Aug. 2013</strong> (Before HB 2)</div>") {
		map.removeLayer(nowLayer);
		map.removeLayer(ascLayer);
		map.addLayer(augustLayer);
		map.addControl(L.mapbox.gridControl(augustLayer, {follow: true}));
	} else if (e.name === "<div id='control-layer'><strong>March 2014</strong></div>") {
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
