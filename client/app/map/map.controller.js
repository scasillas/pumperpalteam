'use strict';

(function(){

  class MapComponent {
    constructor($scope, $http, $rootScope, $stateParams, $timeout) {

      var map;
      var geocoder;
      var markers_on_map = [];
			var zip = $stateParams.zip;
			$scope.zip = zip;
			$scope.noResults = false;

      var data = [{
        name: "Alonso's Pumping Service",
        address: "286 San Juan Grade Road, Salinas, CA 93906",
				hours: "8am - 5 pm",
				phone: "831-776-1352"
      }, {
        name: "PSTS, Inc",
        address: "73 W Carmel Valley Rd, Carmel Valley, CA 93924"
      }];

      var markers = [];

      var bounds = new google.maps.LatLngBounds();
      geocoder = new google.maps.Geocoder();

      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12
      });

      var setMarkersFromAddresses = new Promise(function(resolve, reject) {
				data.forEach(function(item, index) {

          geocoder.geocode({
            'address': item.address
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

              var marker = new google.maps.Marker({
                map: null,
                position: results[0].geometry.location,
								business: item
              });

              marker.setMap(null);
              bounds.extend(marker.position);
              markers.push(marker);
            } else {
              alert("Geocode was not successful for the following reason: " + status);
            }
            map.fitBounds(bounds);
          });
        });

        var interval = setInterval(function() {
          if(data.length == markers.length) {
            clearInterval(interval);
            resolve(markers);
          }
        }, 400);
      });


      setMarkersFromAddresses
      .then(markers => {
        geocoder.geocode({
          'address': zip + ""
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);

            var lat1 = results[0].geometry.location.lat();
            var lon1 = results[0].geometry.location.lng();

            for (var j = 0; j < markers.length; j++) {
              var marker_lat_lng = new google.maps.LatLng(lat1, lon1);
              var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(markers[j].position, marker_lat_lng);

              if (distance_from_location <= 10 * 1000) {

								console.log(marker);

                var marker = new google.maps.Marker({
                  map: map,
                  position: markers[j].position,
                  animation: google.maps.Animation.DROP,
									business: markers[j].business
                });

                markers_on_map.push(marker);
              }
            }

						markers_on_map.forEach(function(marker) {
							var infoWindow = new google.maps.InfoWindow({
								content: "<strong>Name: <strong>" + marker.business.name + "<br><strong>Phone: <strong>" + marker.business.phone + "<br><strong>Hours: </strong>" + marker.business.hours
							});

							google.maps.event.addListener(marker, 'click', function () {
								infoWindow.open(map, marker);
							});
						});

						console.log(markers_on_map);

						if (markers_on_map.length == 0) {
							$timeout(function() {
								$scope.noResults = true;
							}, 0);
						}
          };
        });
      });
    };
  }

  angular.module('pumperpalApp')
  .component('map', {
    templateUrl: 'app/map/map.html',
    controller: MapComponent
  });

})();
