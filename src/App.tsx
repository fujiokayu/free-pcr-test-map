import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 43.76279287299646,
  lng: 142.35864460827105,
};

const MyComponent = () => {
  const [places, setPlaces] = useState([])

  const fetchPlaces = async () => {
    fetch('places.json')
    .then((response) => response.json())
    .then((data) => setPlaces(data.results))
  }
  useEffect(() => {
    fetchPlaces();
  }, [])

  if (!places || places.length === 0) {
    return null;
  }


  return (
    <LoadScript googleMapsApiKey='placeholder'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        {places.map((place) => (
          // @ts-ignore
          <Marker position={place.geometry.location} />
        ))}

      </GoogleMap>
    </LoadScript>
  );
};

export default MyComponent;