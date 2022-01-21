import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"

const containerStyle = {
  height: "100vh",
  width: "100%",
}

const center = {
  lat: 43.76279287299646,
  lng: 142.35864460827105,
}

const divStyle = {
  background: "white",
  fontSize: 7.5,
}

interface markersJson {
  No: React.Key
  latlng: google.maps.LatLng | google.maps.LatLngLiteral
  formatted_address: string
  Name: string
}

const MyComponent = () => {
  const [size, setSize] = useState<undefined | google.maps.Size>(undefined);
  const infoWindowOptions = {
    pixelOffset: size,
  }
  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45))
  }

  const [markers, setMarkers] = useState([])

  const fetchMarkers = async () => {
    fetch('markers.json')
    .then((response) => response.json())
    .then((data) => setMarkers(data.results))
  }
  useEffect(() => {
    fetchMarkers();
  }, [])

  if (!markers || markers.length === 0) {
    return null;
  }


  return (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20}>
        {markers.map((place: markersJson) => (
          <div key={place.No}>
            <Marker position={place.latlng}>
              {place.latlng && <InfoWindow position={place.latlng} options={infoWindowOptions}>
                <div style={divStyle}>
                  <h1>{place.Name}</h1>
                </div>
              </InfoWindow>}
            </Marker>
          </div>
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default MyComponent;