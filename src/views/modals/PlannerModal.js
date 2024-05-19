import { useState, useRef, useEffect } from "react"
import { Autocomplete, useLoadScript } from "@react-google-maps/api"
import ModalHeader from "../../components/ModalHeader"
import routeIcon from "../../assets/img/route-modal-map-icon.png"
import routePlaceholder from "../../assets/img/placeholder.png"
import routeService from "../../services/routeService"
import config from "../../utils/config"
import { library } from "@fortawesome/fontawesome-svg-core"
import * as Icons from "@fortawesome/free-solid-svg-icons"
import "../../assets/styles/modals.css"
import "../../assets/styles/routelist.css"
import RouteList from '../../components/planner/RouteList.js'



const RouteModal = (props) => {

  const {
    onItinerarySelect,
    selectPlannerCenter,
    selectOriginMarker,
    selectDestinationMarker,
    selectRouteDetailCenter,

    onPinOrigin,
    originPinData,
    isPinOrigin,
    onPinDestination,
    destinationPinData,
    isPinDestination
  } = props


  const [loading, setLoading] = useState(false)
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [routes, setRoutes] = useState(null)
  const [error, setError] = useState("")
  const originInputRef = useRef(null)
  const destinationInputRef = useRef(null)

  const [originCoordinates, setOriginCoordinates] = useState({})
  const [destinationCoordinates, setDestinationCoordinates] = useState({})
  // let timeoutId = null

  const handleReset = () => {
    setRoutes(null)
    onItinerarySelect(null)
    originInputRef.current.value = null
    destinationInputRef.current.value = null
    selectDestinationMarker(null)
    // clearTimer()
  }

  // const clearTimer = () => {
  //   if (timeoutId) {
  //     clearTimeout(timeoutId)
  //     timeoutId = null
  //   }
  // }

  // useEffect(() => {
  //   return () => clearTimer(); // Cleanup function to stop timer on unmount
  // }, []);

  useEffect(() => {
    if (originPinData) {
      console.log(originPinData)
      originInputRef.current.value = originPinData.address.results[0].formatted_address
      setOriginCoordinates({lat: originPinData.lat, lng: originPinData.lng})
    }

  }, [originPinData])

  useEffect(() => {
    if (destinationPinData) {
      console.log(destinationPinData)
      destinationInputRef.current.value = destinationPinData.address.results[0].formatted_address
      setDestinationCoordinates({lat: destinationPinData.lat, lng: destinationPinData.lng})
    }

  }, [destinationPinData])


  const handlePinOrigin = () => {
    setError('')
    onPinOrigin(true)
  }

  const handlePinDestination = () => {
    setError('')
    onPinDestination(true)
  }


  const getRoutes = () => {
    setLoading(true)
    setRoutes(null)
    onItinerarySelect(null)

    if (originInputRef.current.value === '' || destinationInputRef.current.value === '') {
      setRoutes(null)
      setError("Wrong input")
      return;
    }


    const data = {
      origin: {
        lat: originCoordinates.lat,
        lng: originCoordinates.lng
      },
      destination: {
        lat: destinationCoordinates.lat,
        lng: destinationCoordinates.lng
      }
    };
    console.log(data)

    routeService
      .create(data)
      .then((response) => {
        console.log(response.data.otpResponse.plan)
        setLoading(false)
        setRoutes(response.data.otpResponse.plan)
        setError("")
        onItinerarySelect(response.data.otpResponse.plan.itineraries[0])
        selectPlannerCenter({
          lat: response.data.otpResponse.plan.itineraries[0].legs[0].from.lat,
          lng: response.data.otpResponse.plan.itineraries[0].legs[0].from.lon
        })
        selectOriginMarker(null)
        // clearTimer()
        // timeoutId = setTimeout(handleReset, 300000)
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setRoutes(null);
          setError(error.response.data.message)
        }
      });
  };


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: config.libraries,
  });


  if (!isLoaded) {
    return <div>Loading...</div>
  }


  const onPlaceOriginChanged = (origin) => {
    if (origin !== null) {
      const places = {
        lat: origin.getPlace().geometry.location.lat(),
        lng: origin.getPlace().geometry.location.lng()
      };
      console.log(places);
      selectOriginMarker(places)
      selectPlannerCenter({lat: places.lat, lng: places.lng})
      setOriginCoordinates({lat: places.lat, lng: places.lng})
    }
    setError("");
  };


  const onPlaceDestinationChanged = (destination) => {
    if (destination !== null) {
      const places = {
        lat: destination.getPlace().geometry.location.lat(),
        lng: destination.getPlace().geometry.location.lng()
      };
      console.log(places);
      selectDestinationMarker(places)
      selectPlannerCenter({lat: places.lat, lng: places.lng})
      setDestinationCoordinates({lat: places.lat, lng: places.lng})
    }
    setError("");
  };


  const options = {
    componentRestrictions: { 
      country: "ph" ,
    },  
    fields: ["geometry"],
  };


  return (
    <>
      <ModalHeader title="Planner" />

      <div className="route-modal-top">
        <div className="route-modal-top-title">
          <h3>Find your Public Transportation Route within Quezon City</h3>
        </div>

        <div className="route-modal-search">
          <div className="route-modal-top-left">
            <img
              className="route-modal-icon"
              src={routeIcon}
              alt="route-icon"
            />

            <div className="route-modal-search-box">
              <Autocomplete
                onPlaceChanged={() => onPlaceOriginChanged(origin)}
                options={options}
                onLoad={(autocomplete) => setOrigin(autocomplete)}
              >
                <input
                  id="Origin"
                  type="text"
                  placeholder="Origin"
                  className="route-modal-combo-box"
                  onClick={() => onPinOrigin(false)}
                  onFocus={() => originInputRef.current.select()}
                  ref={originInputRef}
                />
              </Autocomplete>

              <Autocomplete
                onPlaceChanged={() => onPlaceDestinationChanged(destination)}
                options={options}
                onLoad={(autocomplete) => setDestination(autocomplete)}
              >
                <input
                  id="Destination"
                  type="text"
                  placeholder="Destination"
                  className="route-modal-combo-box"
                  onClick={() => onPinDestination(false)}
                  onFocus={() => destinationInputRef.current.select()}
                  ref={destinationInputRef}
                />
              </Autocomplete>
            </div>

            <div className="route-modal-pin-location">
              <button 
                className="route-modal-pin-location-buttons"
                onClick={handlePinOrigin}
              >
                {isPinOrigin ? "CLICK ON MAP" : "PIN ORIGIN"}
              </button>

              <button 
                className="route-modal-pin-location-buttons"
                onClick={handlePinDestination}
              >
                {isPinDestination ? "CLICK ON MAP" : "PIN DEST."}
              </button>
            </div>
          </div>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <div className="route-modal-button">
          <button className="route-modal-btn" onClick={getRoutes}>
            Find Route
          </button>
        </div>

        <div className="route-modal-bottom">
          {loading ? (
            <div className="route-modal-bottom-nonexist">
              <img
                className="route-modal-bottom-placeholder"
                src={routePlaceholder}
                alt="route"
              ></img>
              <p>Calculating your route, just a moment...</p>
            </div>
          ) : (
            <>
              {!routes ? (
                <div className="route-modal-bottom-nonexist">
                  <img
                    className="route-modal-bottom-placeholder"
                    src={routePlaceholder}
                    alt="route"
                  ></img>
                  <p>Please enter both origin and destination.</p>
                </div>
              ) : (
                <div className="route-modal-list">
                  <div>
                    <h4 className="route-modal-suggestedroutes">
                      Suggested Routes
                    </h4>
                    <div className="route-modal-button-reset">
                      <button onClick={handleReset} className="route-modal-btn-reset">Reset</button>
                    </div>
                  </div>
                  <div style={{marginLeft: "10px", fontSize: "14px"}}>Note: ETA may vary depending on real-time traffic</div>
                  <div>
                    <RouteList 
                      routes={routes} 
                      origin={originInputRef.current.value}
                      destination={destinationInputRef.current.value}
                      onItinerarySelect={onItinerarySelect}
                      selectPlannerCenter={selectPlannerCenter}
                      selectRouteDetailCenter={selectRouteDetailCenter}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RouteModal;

const iconList = Object.keys(Icons)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((icon) => Icons[icon]);
library.add(...iconList);

// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     fontSize: '15px',
//     border: '2px inset #EBE9ED',
//     width: '290px',
//     height: '100px',
//   }),
// };
