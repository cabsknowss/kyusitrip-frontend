import { useState, useEffect } from 'react'

import GoogleMapApi from '../components/googlemap/GoogleMapApi'
import HomeButtons from '../utils/HomeButtons'
import HomeModals from '../utils/HomeModals' 
import reportService from '../services/reportService'
import '../assets/styles/home.css'


const HomePage = () => {

  // ------------------------------------------------------------ //
  // General Declarations/States
  // ------------------------------------------------------------ //
  const [mapZoom, setMapZoom] = useState(15)
  const [centerLat, setCenterLat] = useState(14.6515)
  const [centerLng, setCenterLng] = useState(121.0493)
  const [showTrafficLayer, setShowTrafficLayer] = useState(false)



  // ------------------------------------------------------------ //
  // General Callback Functions
  // ------------------------------------------------------------ //
  const selectMapZoom = (zoom) => {
    setMapZoom(zoom)
  }



  // ------------------------------------------------------------ //
  // To determine what modal is active
  // ------------------------------------------------------------ //
  const [activeModal, setActiveModal] = useState("planner")
  const btnModalClick = (modal) => {
    setActiveModal(modal);
    setReportMarker(null)
    setReportData(null)
    setCenterLat(14.6515)
    setCenterLng(121.0493)
    setMapZoom(14)
    setSelectedItinerary(null)
  }



  // ------------------------------------------------------------ //
  // Get token from reportService to be used in reporting incidents
  // ------------------------------------------------------------ //
  const [hasToken, setHasToken] = useState()
  useEffect(() => {
    setHasToken(reportService.getToken())
  }, [])



  // ------------------------------------------------------------ //
  // Report Modal related
  // ------------------------------------------------------------ //
  const [isMarkLocation, setIsMarkLocation] = useState(false) // Make it possible to pin location on map if true
  const onMarkLocation = (isMarking) => { // Callback function when clicking "Click Hererk Location"
    setIsMarkLocation(isMarking)
  }; 

  const [reportData, setReportData] = useState(null) // Report Data State
  const onLocationSelect = (location) => { // Callback function that gets pinned report details
    setReportData(location)
  };

  const [reportMarker, setReportMarker] = useState(null) // Report Marker State
  const selectReportMarker = (isMarking) => { // Callback function that sets the report marker to null when report is submitted successfully
    setReportMarker(isMarking)
  }

  useEffect(() => {
    if (reportData) {
      setMapZoom(16)
      setCenterLat(reportData.lat)
      setCenterLng(reportData.lng)
      setReportMarker({lat: reportData.lat, lng: reportData.lng})
    } 
  }, [reportData]) // Using the data from reportData state, Run the functions on block of code



  // ------------------------------------------------------------ //
  // Planner Modal - For pinning origin and destination
  // ------------------------------------------------------------ //
  const [isPinOrigin, setIsPinOrigin] = useState(false) // Make it possible to pin origin location on map if true
  const onPinOrigin = (isPin) => { // Callback function when clicking "PIN ORIGIN"
    setIsPinOrigin(isPin)
  }

  const [originPinData, setOriginPinData] = useState(null) // Origin Data State
  const onOriginLocationSelect = (location) => { // Callback function that gets pinned origin details
    setOriginPinData(location)
  }

  const [isPinDestination, setIsPinDestination] = useState(false) // Make it possible to pin destination location on map if true
  const onPinDestination = (isPin) => { // Callback function when clicking "PIN DEST."
    setIsPinDestination(isPin)
  }

  const [destinationPinData, setDestinationPinData] = useState(null) // Destination Data State
  const onDestinationLocationSelect = (location) => { // Callback function that gets pinned destination details
    setDestinationPinData(location)
  }

  useEffect(() => {
    if (originPinData) {
      setMapZoom(16)
      setCenterLat(originPinData.lat)
      setCenterLng(originPinData.lng)
      setOriginMarker({lat: originPinData.lat, lng: originPinData.lng})
    }
  }, [originPinData]) // Using the data from originPinData state, Run the functions on block of code

  useEffect(() => {
    if (destinationPinData) {
      setMapZoom(16)
      setCenterLat(destinationPinData.lat)
      setCenterLng(destinationPinData.lng)
      setDestinationMarker({lat: destinationPinData.lat, lng: destinationPinData.lng})
    }
  }, [destinationPinData]) // Using the data from destinationPinData state, Run the functions on block of code



  // ------------------------------------------------------------ //
  // Planner Modal - For searching origin and destination (autocomplete)
  // ------------------------------------------------------------ //
  const selectPlannerCenter = (latlng) => { // Callback function that centers the origin/destination
    setCenterLat(latlng.lat)
    setCenterLng(latlng.lng)
    setMapZoom(latlng.zoom)
  }

  const [originMarker, setOriginMarker] = useState(null)
  const selectOriginMarker = (origin) => { // Callback function that sets origin marker
    console.log(origin)
    setOriginMarker(origin)
  }

  const [destinationMarker, setDestinationMarker] = useState(null)
  const selectDestinationMarker = (destination) => { // Callback function that sets destination marker
    console.log(destination)
    setDestinationMarker(destination)
  }



  // ------------------------------------------------------------ //
  // Planner Modal - Callback Functions for Generated Itineraries
  // ------------------------------------------------------------ //
  const [selectedItinerary, setSelectedItinerary] = useState(null)
  const onItinerarySelect = (itinerary) => { // Callback function when one of the itineraries were clicked
    setSelectedItinerary(itinerary) // Will store that specific itinerary in selectedItinerary State
    console.log("onItinerarySelect")
  }

  const selectRouteDetailCenter = (latlng) => { // Callback function that centers when one of the route details is clicked
    setCenterLat(latlng.lat)
    setCenterLng(latlng.lng)
    setMapZoom(latlng.zoom)
    console.log("selectRouteDetailCenter")
  }

  

  // ------------------------------------------------------------ //
  // Hindrace Modal
  // ------------------------------------------------------------ //
  const selectHindranceCenter = (latlng) => { // Callback function that centers a report on map when one of the list of hindrances is clicked
    setCenterLat(latlng.lat)
    setCenterLng(latlng.lng)
    setMapZoom(latlng.zoom)
  }

  
    
  return (
    <>
      <div className='home-modal'>
        <HomeModals 

          // Show Modal
          routeReportModal={activeModal === "report"}
          routePlannerModal={activeModal === "planner"}
          routeUpdateModal={activeModal === "updates"}
          routeListModal={activeModal === "list"}
          routeMenuModal={activeModal === "menu"}

          // Report Modal
          onMarkLocation={onMarkLocation}
          onLocationSelect={onLocationSelect}
          reportData={reportData}
          selectReportMarker={selectReportMarker}
          selectMapZoom={selectMapZoom}

          // Planner Modal
          onItinerarySelect={onItinerarySelect}
          selectPlannerCenter={selectPlannerCenter}
          selectOriginMarker={selectOriginMarker}
          selectDestinationMarker={selectDestinationMarker}
          selectRouteDetailCenter={selectRouteDetailCenter}
          onPinOrigin={onPinOrigin}
          originPinData={originPinData}
          isPinOrigin={isPinOrigin}
          onPinDestination={onPinDestination}
          destinationPinData={destinationPinData}
          isPinDestination={isPinDestination}

          // Hindrance Modal
          selectHindranceCenter={selectHindranceCenter}

        />
      </div>

      <GoogleMapApi 
        
        mapZoom={mapZoom}
        centerLat={centerLat}
        centerLng={centerLng}      

        // Report Modal
        isMarkLocation={isMarkLocation} // boolean variable
        onMarkLocation={onMarkLocation} // function that will setIsMarkLocation
        onLocationSelect={onLocationSelect}
        reportMarker={reportMarker}

        // Planner Modal
        selectedItinerary={selectedItinerary}
        originMarker={originMarker}
        destinationMarker={destinationMarker}
        selectOriginMarker={selectOriginMarker}
        selectDestinationMarker={selectDestinationMarker}
        isPinOrigin={isPinOrigin}
        onPinOrigin={onPinOrigin}
        onOriginLocationSelect={onOriginLocationSelect}
        isPinDestination={isPinDestination}
        onPinDestination={onPinDestination}
        onDestinationLocationSelect={onDestinationLocationSelect}

        showTrafficLayer={showTrafficLayer}

      />  

      <div className="home-buttons">
        <HomeButtons 
          routeReport = {hasToken}
          routePlanner = {true}
          routeUpdate = {true}
          routeMenu = {true}
          btnModalClick={btnModalClick}
        />
      </div>

      <div className='home-page-layers'>
        <button className='gmap-layer-button' onClick={() => setShowTrafficLayer(!showTrafficLayer)}>{showTrafficLayer ? "Hide Traffic" : "Show Traffic"}</button>
      </div>
    </>
  )
}

export default HomePage
