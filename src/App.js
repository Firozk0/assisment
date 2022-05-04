import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import { getLatLng } from "react-places-autocomplete";
import { geocodeByAddress } from "react-places-autocomplete";
import Geocode from "react-geocode";

import PlacesAutocomplete from "react-places-autocomplete/dist/PlacesAutocomplete";
import { PlaceAutoComplete } from "./components/PlaceAutoComplete";
let YOUR_API_KEY = "";
Geocode.setApiKey(`${YOUR_API_KEY}`);
Geocode.setLanguage("en");
Geocode.setRegion("in");
Geocode.enableDebug();

const mapStyles = {
  height: "100vh",
  width: "100%",
};
export const App = () => {
  const [location, setLocation] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");
  const [viewInfo, setViewInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [markers, setMarkers] = useState([]);

  const handleChange = (search) => {
    setLocation(location);
    setSearch(search);
  };

  const handleSelect = (newAddress) => {
    setLocation(location);
    setSearch(newAddress);
    geocodeByAddress(newAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setLocation(latLng);
        setAddress(address);
        getAddress();
      })
      .catch((error) => console.error("Error", error));
  };

  const getAddress = () => {
    Geocode.fromLatLng(location.lat, location.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address);
        setCopied(false);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLocation((location) => ({ ...location, lat: lat, lng: lng }));
    setCopied(false);
    getAddress();
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Allow to track your loaction");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation((location) => ({
          ...location,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));
        setMarkers([
          {
            text: "Current Location",
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        ]);

        getAddress();
      },
      (error) => {
        alert(JSON.stringify(error));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }, []);

  const handleGeoCode = (latLng) => {
    Geocode.fromLatLng(latLng.lat(), latLng.lng()).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setMarkers([{ text: address, lat: latLng.lat(), lng: latLng.lng() }]);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  return (
    <>
      <LoadScript googleMapsApiKey={`${YOUR_API_KEY}&libraries=places`}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={16}
          center={location}
          onClick={handleGeoCode}
          position={location}
          setViewInfo={setViewInfo}
		  onDragEnd={(e) => onMarkerDragEnd(e)}
		  markers={markers}
		  viewInfo={viewInfo}
		  address={address}
        />
		<PlaceAutoComplete
		 value={search}
		 onChange={handleChange}
		 onSelect={handleSelect}
		/>
        <div className="App__Address">
          {address.length === 0
            ? "This Site request a location Access,Enable it to get your current Location"
            : address}

          <div
            className="App__copy"
            onClick={() => {
              navigator.clipboard.writeText(address);
              setCopied(true);
            }}
          >
            {copied ? "Address Copied to Clipboard" : "click here to copy"}
          </div>
        </div>
      </LoadScript>
    </>
  );
};
export default App;
