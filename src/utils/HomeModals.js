import ReportModal from '../views/modals/ReportModal'
import HindranceModal from '../views/modals/HindranceModal'
import PlannerModal from '../views/modals/PlannerModal'
import MenuModal from '../views/modals/MenuModal'



const HomeModals = (props) => {


  return (
    <>
      {props.routeReportModal 
        ? <ReportModal 
          onMarkLocation={props.onMarkLocation}
          onLocationSelect={props.onLocationSelect}
          reportData={props.reportData}
          selectReportMarker={props.selectReportMarker}
          selectMapZoom={props.selectMapZoom}
        /> 
        : <></>
      }

      {props.routePlannerModal 
        ? <PlannerModal 
          onItinerarySelect={props.onItinerarySelect}
          selectPlannerCenter={props.selectPlannerCenter}
          selectOriginMarker={props.selectOriginMarker}
          selectDestinationMarker={props.selectDestinationMarker}
          selectRouteDetailCenter={props.selectRouteDetailCenter}
          onPinOrigin={props.onPinOrigin}
          originPinData={props.originPinData}
          isPinOrigin={props.isPinOrigin}
          onPinDestination={props.onPinDestination}
          destinationPinData={props.destinationPinData}
          isPinDestination={props.isPinDestination}
        /> 
        : <></>
      }

      {props.routeUpdateModal 
        ? <HindranceModal 
          selectHindranceCenter={props.selectHindranceCenter}
        /> 
        : <></>
      }

      {props.routeMenuModal 
        ? <MenuModal /> 
        : <></>
      }
    </>
  )
}

export default HomeModals
