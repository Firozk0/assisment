import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete/dist/PlacesAutocomplete';

export const PlaceAutoComplete = ({
    value,
    onChange,
    onSelect
}) => {
  return (
    <>
       <PlacesAutocomplete
          value={value}
          onChange={onChange}
          onSelect={onSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="App__input">
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && (
                  <div style={{ fontSize: "bold", textAlign: "center" }}>
                    Loading...
                  </div>
                )}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? "suggestion-active"
                    : "suggestion-item";
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      key={index}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
    </>
  )
}
