import React from 'react'

export const GoogleMap = ({
    address,
    setViewInfo,
    viewInfo,
    markers,
    onDragEnd,
    position,
    latLng,
    handleGeoCode,
}) => {
  return (
    <>
       <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={16}
          center={position}
          onClick={({ latLng }) => {
            Geocode.fromLatLng(latLng.lat(), latLng.lng()).then(
              (response) => {
                const address = response.results[0].formatted_address;
                setMarkers([
                  { text: address, lat: latLng.lat(), lng: latLng.lng() },
                ]);
              },
              (error) => {
                console.error(error);
              }
            );
          }}
        >
          <Marker
            onClick={() => setViewInfo(true)}
            position={position}
            draggable={true}
            onDragEnd={(e) => onMarkerDragEnd(e)}
          />
          {/* {markers.map((mark, index) => {
							// if (index)
							return (
								<Marker
									key={index}
									// onClick={() => setViewInfo(true)}
									position={{lat: mark.lat, lng: mark.lng}}
									// draggable={true}
									// onDragEnd={(e) =>onMarkerDragEnd(e)}
								/>
							);
						})} */}
          {viewInfo ? (
            <InfoWindow
              position={position}
              onCloseClick={() => setViewInfo(false)}
            >
              <p>{address}</p>
            </InfoWindow>
          ) : (
            ""
          )}
        </GoogleMap>  
    </>
  )
}
