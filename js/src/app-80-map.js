/** ========================
============================
@project    : Vorttex
@version    : 1.0
@author     : Thiago Aguiar - thiago.aguiar86@gmail.com
@copyright  : 2016
============================
@begin
=========================**/

var Markers = {};
var map;
var infowindow;
var origin = new google.maps.LatLng(-15.2726808, -99.5067909);
var image = 'img/bg-ico-map.png';

var locations = [
   ['Comitê em Brasil', 'Rio de Janeiro', -22.9111721, -43.5884177, 0],
   ['Comitê em Brasil', 'Amazonas', -3.774096, -69.447502, 0],
   ['Comitê em Uruguai', '', -32.5384207, -58.0548368, 0],
   ['Comitê em Guiné', '', 9.9252976, -13.6019335, 0],
   ['Comitê em Venezuela', '', 6.6368146, -71.1103011, 0],
   ['Comitê em Paraguai', '', -23.3744849, -60.6940965, 0],
   ['Comitê em Brasil', '', -23.6821604, -46.8754827, 0]
];

function initialize() {
   var option = {
      zoom: 3,
      center: origin,
      disableDefaultUI: true
   };

   map = new google.maps.Map(document.getElementById('map'), option);

   infowindow = new google.maps.InfoWindow();

   for(i = 0; i < locations.length; i++) {
      var position = new google.maps.LatLng(locations[i][2], locations[i][3]);
      var marker = new google.maps.Marker({
         position: position,
         map: map,
         icon: image
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
         return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.setOptions({maxWidth: 200});
            infowindow.open(map, marker);
         }
      }) (marker, i));
      
      Markers[locations[i][4]] = marker;
   }
   locate(0);
}

function locate(id) {
   var element = Markers[id];
   var elementPosition = element.getPosition();
   map.setCenter(elementPosition);
   google.maps.event.trigger(element, 'click');
}

google.maps.event.addDomListener(window, 'load', initialize);

/** ========================
end
=========================**/