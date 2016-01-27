/**
 * file per script javascript generici
 */

var map;
var markers = []; 

/**
 * inizializzazione oggetti della pagina
 */
function init(){

	$("#accordion").accordion({
		//heightStyle : "fill", 
		heightStyle: "content", 
		collapsible: true
	});
	
	map = L.map('map').setView([44, 11], 6);
	
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);
	
	$("#map").height($(document).height());
	var $window = $(window).on('resize', function(){
	       var height = $(document).height();
	       $("#map").height(height);
	    }).trigger('resize'); //on page load
	
	readPoints();
	
}

/**
 * Lettura punti
 */
function readPoints () {
	$.ajax({
	    url: "http://localhost:3000/indirizzi",
	    dataType: "json",
	    success: function(data){
	    	//var content = "<table>";
	    	content = "";
	    	for (var i = 0; i < data.length; i++) {
				var obj = data[i];
				//var marker = L.marker([obj.GEO.x, obj.GEO.y], {icon: greenIcon}).addTo(map).bindPopup("I am a green leaf.");
				var marker = L.marker([obj.GEO.y, obj.GEO.x], {jsonDati: obj}).addTo(map).bindPopup(objJsonToMarker(obj));
				markers.push(marker);
				content += "<tr>";
				content += '<td><input type="checkbox" checked="checked" onclick="javasript:toggleMarker(\''+obj.ID+'\', this);" /></td>';
				content += "<td>"+obj.NOME+"</td>";
				content += "<td>"+obj.COGNOME+"</td>";
				content += "</tr>";
			}
	    	//content += "<table>";
	    	$('#listaPunti').append(content);
	    }
	});
}

function objJsonToMarker (objJson) {
	var html = "";
	html += "<table>";
	for ( var key in objJson) {
		html += "<tr>";
		if (key == "GEO") {
			html += "<td>Coordinate</td>";
			html += "<td>Lon:"+objJson[key].x+" - Lat:"+objJson[key].y+"</td>";
		} else {
			html += "<td>"+key+"</td>";
			html += "<td>"+objJson[key]+"</td>";
		}
		html += "</tr>";
	}
	html += "</table>";
	return html;
}

function toggleMarker(id, checkObj) {
	for (var i = 0; i < markers.length; i++) {
		var marker = markers[i];
		if (marker.options.jsonDati.ID == id) {
			if($(checkObj).prop( "checked")) {
				map.addLayer(marker);
		    } else {
		        map.removeLayer(marker);
		   }
		}
	}
}


