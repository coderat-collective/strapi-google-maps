import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useContext, useEffect, createContext, useRef, useReducer } from "react";
import { Loader, Grid, TextInput, Typography, Box, Button } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { u as useConfig } from "./useConfig-DEC7oP4E.mjs";
import { StandaloneSearchBox, GoogleMap, Marker } from "@react-google-maps/api";
import { ArrowClockwise } from "@strapi/icons";
import Geohash from "latlon-geohash";
import { useGeolocated } from "react-geolocated";
const noPoint = {
  lat: NaN,
  lng: NaN
};
const isValidPoint = (point) => {
  return !isNaN(point.lat) && !isNaN(point.lng);
};
const isSamePoint = (point1, point2) => {
  return point1.lat === point2.lat && point1.lng === point2.lng;
};
function Search({
  userCoords,
  currentAddress,
  onPlaceSelected,
  onAddressEdited
}) {
  const { formatMessage } = useIntl();
  const bounds = !!userCoords ? new google.maps.LatLngBounds({
    lat: userCoords.latitude,
    lng: userCoords.longitude
  }) : void 0;
  const [searchBox, setSearchBox] = useState();
  const onPlacesChanged = () => {
    const results = searchBox?.getPlaces();
    if (results && results.length) {
      const place = results[0];
      onPlaceSelected({
        address: place.formatted_address || "",
        coordinates: place.geometry?.location?.toJSON()
      });
    }
  };
  return /* @__PURE__ */ jsx(
    StandaloneSearchBox,
    {
      bounds,
      onLoad: (ref) => setSearchBox(ref),
      onPlacesChanged,
      children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: formatMessage({
            id: "google-maps.input.search.placeholder",
            defaultMessage: "Search for a place"
          }),
          value: currentAddress,
          onChange: (e) => onAddressEdited(e.target.value),
          style: {
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `300px`,
            height: `40px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-140px",
            marginTop: "10px"
          }
        }
      )
    }
  );
}
const GoogleMapsContext = createContext({
  isLoaded: false,
  loadError: false
});
const useGoogleMaps = () => useContext(GoogleMapsContext);
let scriptState = {
  isLoaded: false,
  isLoading: false,
  loadError: false,
  apiKey: "",
  callbacks: /* @__PURE__ */ new Set()
};
const isGoogleMapsReady = () => {
  return !!(typeof window !== "undefined" && window.google && window.google.maps && window.google.maps.Map && window.google.maps.places);
};
const loadGoogleMapsScript = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (isGoogleMapsReady()) {
      resolve();
      return;
    }
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      const checkReady = () => {
        if (isGoogleMapsReady()) {
          resolve();
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const checkReady = () => {
        if (isGoogleMapsReady()) {
          resolve();
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    };
    script.onerror = () => {
      reject(new Error("Failed to load Google Maps script"));
    };
    document.head.appendChild(script);
  });
};
const GoogleMapsProvider = ({ children, config }) => {
  const [isLoaded, setIsLoaded] = useState(scriptState.isLoaded);
  const [loadError, setLoadError] = useState(scriptState.loadError);
  useEffect(() => {
    if (!config?.googleMapsKey) return;
    if (scriptState.isLoaded && scriptState.apiKey === config.googleMapsKey) {
      setIsLoaded(true);
      return;
    }
    if (scriptState.isLoading && scriptState.apiKey === config.googleMapsKey) {
      const callback = () => {
        setIsLoaded(scriptState.isLoaded);
        setLoadError(scriptState.loadError);
      };
      scriptState.callbacks.add(callback);
      return () => {
        scriptState.callbacks.delete(callback);
      };
    }
    if (!scriptState.isLoading && !scriptState.isLoaded) {
      scriptState.isLoading = true;
      scriptState.apiKey = config.googleMapsKey;
      loadGoogleMapsScript(config.googleMapsKey).then(() => {
        scriptState.isLoaded = true;
        scriptState.isLoading = false;
        setIsLoaded(true);
        scriptState.callbacks.forEach((callback) => callback());
      }).catch((error) => {
        console.error("Failed to load Google Maps:", error);
        scriptState.loadError = true;
        scriptState.isLoading = false;
        setLoadError(true);
        scriptState.callbacks.forEach((callback) => callback());
      });
    }
  }, [config?.googleMapsKey]);
  const value = {
    isLoaded: isLoaded && isGoogleMapsReady(),
    loadError
  };
  return /* @__PURE__ */ jsx(GoogleMapsContext.Provider, { value, children });
};
const fallbackCenter = {
  lat: 51.51652494189269,
  lng: 7.45560626859687
};
function MapView({
  children,
  config,
  focusPoint,
  currentAddress,
  onCoordsChange,
  onAddressChange
}) {
  const { isLoaded, loadError } = useGoogleMaps();
  const [center, setCenter] = useState(fallbackCenter);
  const { coords: userCoords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false
    }
  });
  useEffect(() => {
    if (focusPoint) {
      setCenter(focusPoint);
    } else if (userCoords) {
      setCenter({
        lat: userCoords.latitude,
        lng: userCoords.longitude
      });
    } else {
      setCenter(fallbackCenter);
    }
  }, [focusPoint, userCoords]);
  const onPlaceSelected = (place) => {
    onCoordsChange({ origin: "placeSearch", value: place.coordinates });
    onAddressChange(place.address);
  };
  if (loadError) {
    return /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center", padding: "20px" }, children: /* @__PURE__ */ jsx("p", { children: "Failed to load Google Maps. Please check your API key." }) });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: isLoaded ? /* @__PURE__ */ jsxs(
    GoogleMap,
    {
      mapContainerStyle: {
        width: "100%",
        height: "400px"
      },
      center,
      zoom: 20,
      onClick: ({ latLng }) => onCoordsChange({
        origin: "map",
        value: latLng?.toJSON()
      }),
      children: [
        /* @__PURE__ */ jsx(
          Search,
          {
            userCoords,
            currentAddress,
            onPlaceSelected,
            onAddressEdited: onAddressChange
          }
        ),
        children
      ]
    }
  ) : /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsx(Loader, { small: true }) }) });
}
function generateId(len) {
  function dec2hex(dec) {
    return dec.toString(16).padStart(2, "0");
  }
  var arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}
function NumberFields({
  coords,
  onChange
}) {
  const windowInputValueDescriptor = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  );
  if (!windowInputValueDescriptor) return null;
  const latInputId = generateId(10);
  const lngInputId = generateId(10);
  const { lat, lng } = coords;
  useEffect(() => {
    const latInput = document.getElementById(latInputId);
    const lngInput = document.getElementById(lngInputId);
    const setInputValueNatively = (input, value) => windowInputValueDescriptor.set.call(input, isNaN(value) ? null : value);
    setInputValueNatively(latInput, lat);
    setInputValueNatively(lngInput, lng);
    const changeEvent = new Event("change", { bubbles: true });
    latInput.dispatchEvent(changeEvent);
    lngInput.dispatchEvent(changeEvent);
  }, [lat, lng]);
  return /* @__PURE__ */ jsxs(Grid.Root, { gap: 3, children: [
    /* @__PURE__ */ jsx(Grid.Item, { col: 6, children: /* @__PURE__ */ jsx(
      TextInput,
      {
        id: latInputId,
        placeholder: "Latitude",
        "aria-label": "Latitude",
        hint: "Latitude",
        name: "latitude",
        onChange: (e) => {
          if (!e.target.value) return;
          onChange({ lat: Number(e.target.value), lng });
        },
        size: "S"
      }
    ) }),
    /* @__PURE__ */ jsx(Grid.Item, { col: 6, children: /* @__PURE__ */ jsx(
      TextInput,
      {
        id: lngInputId,
        placeholder: "Longtitude",
        "aria-label": "Longtitude",
        hint: "Longtitude",
        name: "longtitude",
        onChange: (e) => {
          if (!e.target.value) return;
          onChange({ lat, lng: Number(e.target.value) });
        },
        size: "S"
      }
    ) })
  ] });
}
function Input({
  attribute,
  onChange,
  value,
  name,
  required,
  label,
  intlLabel
}) {
  const { formatMessage } = useIntl();
  const config = useConfig();
  const isInitialMount = useRef(true);
  const [focusPoint, setFocusPoint] = useState();
  const [currentPoint, setCurrentPoint] = useReducer((state, action) => {
    const { origin, value: value2 } = action;
    if ((origin === "coordsInput" || origin === "placeSearch" || origin === "fieldValue") && isValidPoint(value2) && !isSamePoint(state, value2)) {
      setFocusPoint(value2);
    }
    return value2;
  }, noPoint);
  const [currentAddress, setCurrentAddress] = useState("");
  const [nothingSelectedWarning, setNothingSelectedWarning] = useState(false);
  useEffect(() => {
    if (required && !isValidPoint(currentPoint)) {
      setNothingSelectedWarning(true);
    } else if (nothingSelectedWarning) {
      setNothingSelectedWarning(false);
    }
  }, [currentPoint]);
  useEffect(() => {
    if (!value) return;
    let parsedValue = value;
    if (typeof value === "string") {
      parsedValue = JSON.parse(value);
    }
    if (!parsedValue) return;
    const { address, coordinates } = parsedValue;
    if (address === currentAddress && isSamePoint(currentPoint, coordinates)) return;
    setCurrentPoint({ origin: "fieldValue", value: coordinates });
    setCurrentAddress(address);
  }, [value]);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const newValue = isValidPoint(currentPoint) ? JSON.stringify({
      address: currentAddress,
      coordinates: currentPoint,
      geohash: Geohash.encode(currentPoint.lat, currentPoint.lng)
    }) : null;
    if (newValue === (typeof value === "string" ? value : JSON.stringify(value))) return;
    onChange({
      target: {
        name,
        value: newValue,
        type: attribute.type
      }
    });
  }, [currentPoint, currentAddress]);
  useEffect(() => {
    if (config?.defaultLatitude && config?.defaultLongitude && !value) {
      setFocusPoint({
        lat: parseFloat(config.defaultLatitude),
        lng: parseFloat(config.defaultLongitude)
      });
    }
  }, [config]);
  const onReset = () => {
    setCurrentPoint({ origin: "reset", value: noPoint });
    setCurrentAddress("");
  };
  const displayLabel = label || (intlLabel ? formatMessage(intlLabel) : formatMessage({
    id: "input.label",
    defaultMessage: "Location Picker"
  }));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", children: displayLabel }),
    !config && /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsx(Loader, { small: true }) }),
    !!config && /* @__PURE__ */ jsxs(GoogleMapsProvider, { config, children: [
      /* @__PURE__ */ jsx(Box, { marginTop: 1, borderColor: nothingSelectedWarning ? "danger600" : "primary200", children: /* @__PURE__ */ jsx(
        MapView,
        {
          config,
          focusPoint,
          currentAddress,
          onCoordsChange: setCurrentPoint,
          onAddressChange: setCurrentAddress,
          children: isValidPoint(currentPoint) && /* @__PURE__ */ jsx(Marker, { position: currentPoint })
        }
      ) }),
      nothingSelectedWarning && /* @__PURE__ */ jsx(Box, { paddingTop: 1, children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "danger600", children: formatMessage({
        id: "input.error.required"
      }) }) }),
      /* @__PURE__ */ jsx(Box, { paddingTop: 2, children: /* @__PURE__ */ jsx(
        NumberFields,
        {
          coords: currentPoint,
          onChange: (point) => setCurrentPoint({ origin: "coordsInput", value: point })
        }
      ) }),
      /* @__PURE__ */ jsx(Box, { paddingTop: 2, children: /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(ArrowClockwise, {}), onClick: onReset, children: formatMessage({
        id: "input.button.reset"
      }) }) })
    ] })
  ] });
}
export {
  Input as default
};
