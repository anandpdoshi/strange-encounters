function onMountLoadMap(component, callback) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbmRwZCIsImEiOiJjajl0N2hkeHcwMDF3MnducnJjdWYyZjVhIn0.MD3oCzM56eeo5fusBY0iaA';

    navigator.geolocation.getCurrentPosition(
        function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;
            component.setLocation(longitude, latitude);

            console.log(longitude, latitude);

            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/light-v9',
                center: [longitude, latitude],
                minZoom: 16
            });

            var marker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map);

            lookupLocation(component);
            setupDraggableMarker(map, marker, component);
            callback && callback(map, marker);

        },
        function error(positionError) {
            console.error(positionError);
            console.error("Unable to retrieve your location");
        }
    );
};

function setupDraggableMarker(map, marker, component) {
    marker.getElement().setAttribute('id', 'marker');

    // console.log(marker.getElement());

    function setMarker() {
        marker.setLngLat(map.getCenter());
    }

    function changeLocation() {
        var center = map.getCenter();
        marker.setLngLat(center);
        component.setLocation(center.lng, center.lat);
        lookupLocation(component);
    }


    map.on('mouseup', function() {
        // console.log('mouseup');
        changeLocation();
    });

    map.on('drag', function() {
        // console.log('dragging', map.getCenter());
        setMarker();
    });

    map.on('touchmove', function() {
        console.log('touchmove');
        setMarker();
    });

    var touchTimeout;

    map.on('touchend', function() {
        console.log('touchend');
        touchTimeout && clearTimeout(touchTimeout);
        touchTimeout = setTimeout(function() {
            changeLocation();
        }, 500);
    });

};

function lookupLocation(component) {
    var longitude = component.longitude;
    var latitude = component.latitude;
    jQuery.ajax({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
        type: 'GET',
        data: {
            proximity: `${longitude},${latitude}`,
            access_token: mapboxgl.accessToken

        },
        crossDomain: true,
        success: function(data) {
            // console.log(data);
            if (data && data.features && data.features.length) {
                console.log(data);
                data.features.some((d) => {
                    // console.log(this);
                    if (d.place_type.includes("address") || d.place_type.includes("poi")) {
                        component.setLocation(longitude, latitude, d.place_name);
                        return true;
                    }
                });
            }
        }
    });
};
