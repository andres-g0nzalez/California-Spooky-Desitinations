function initMap() {
            // use jquery getJSON() to load the external json
            $.getJSON(
              // 1: the url to load the external json file
              'map.json',
              // 2: anon function holding the block of code to run after json is loaded
              function(jsonData) {
                // wait until json loads, then make google maps

                // gmap 1: set the center point for the maps
                var geocoord1 = {
                  lat: 38.465098,
                  lng: -122.7215907
                };
                  
                  
                // gmap 2: create the google map object
                var map1 = new google.maps.Map(
                  // 1: reference to html element to put map in
                  document.getElementById('mymap'),
                  // 2: map options in object value format
                  {
                    center: geocoord1,
                    zoom: 10,
                    styles:[
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#db6c0b"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#222222"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#282828"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#f7690f"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "saturation": "-35"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#6a6969"
            },
            {
                "weight": "0.74"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f7690f"
            },
            {
                "lightness": "-43"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#5c4d44"
            },
            {
                "lightness": "2"
            },
            {
                "saturation": "-14"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#091319"
            }
        ]
    }
]
                      
                  }
                    
                );
        //Gets users location
                  infoWindow = new google.maps.InfoWindow;
              if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
        // marker2
            var marker2 = new google.maps.Marker(
            {
                position:pos,
                map:map1,
                icon:{
                    url:"markers/ghost_icon.png",
                    scaledSize: new google.maps.Size(55,55),
                }
            });
          //add a info window
            var info2 = new google.maps.InfoWindow(
            {
                content: "<h4>This is your location</h4>"
            });
            
            //attach click event trigger to open infowindow
            marker2.addListener(
            //event to detect string
            'click',
                //function for maps to run when click happens
                function()
                {
                    info2.open(map1, marker2);
                }
            );
    
      infoWindow.setPosition(pos);
      infoWindow.setContent('<h2>I found you</h2> <p>this is where you are</p>');
        
      infoWindow.open(map1);
      map1.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map1.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map1.getCenter());
  }

                // gmap 3: create markers - one for each object value in the jsonData array
                var markers = [];
                for (var c = 0; c < jsonData.length; c++ ) {
                  // inside curlies than runs once for each object value

                  // set geoloc for marker from json data
                  var geocoord = {
                    lat: jsonData[c].lat ,
                    lng: jsonData[c].lng
                  };

                  markers[c] = new google.maps.Marker(
                    {
                      position: geocoord,
                      map: map1,
                      title: jsonData[c].title,
                      custom_property: jsonData[c].description,
                     icon:{
                    url:"markers/grave_icon.png",
                    scaledSize: new google.maps.Size(65,65),
                }
                        
                    }
                    
                  );
                  // gmap 4: attach a block of to run when marker click to open infowindow
                  markers[c].addListener(
                    'click',
                    function() {
                      var info1 = new google.maps.InfoWindow(
                        {
                          content: this.custom_property
                        }
                      );
                      info1.open(map1, this);
                    }
                  )
                }

                
              }
                
            );
              
          }