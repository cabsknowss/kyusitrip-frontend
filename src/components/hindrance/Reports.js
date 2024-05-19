import { useState } from 'react'
import "../../assets/styles/modals.css";
import notif from '../../assets/img/notif.png'
import maximize from '../../assets/img/maximize.png'
import ReportDetail from '../ReportDetail'



const Reports = (props) => {

  const {
    report,
    selectHindranceCenter
  } = props

  const [showModal, setShowModal] = useState(false)

  const handleHindranceClick = () => {
    selectHindranceCenter({lat: report.latLng.lat, lng: report.latLng.lng, zoom: 16})
  }

  
  return (
    <div onClick={handleHindranceClick} className='hindrance-modal-reports'>
      <div className="hindrance-modal-reportlist">
        <div className='hindrance-modal-reportlist-top'>
          <div className='hindrance-modal-reportlist-top-left'>
            <img src={notif} alt="notif-icon" className='hindrance-notif-icon' />
            <p>{report.user.name}</p>
          </div>
          <div className='hindrance-modal-reportlist-top-right'>
            <img onClick={() => {setShowModal(true)}} src={maximize} alt="maximize-icon" className='hindrance-maximize-icon' />
          </div>
        </div>
        <div className='hindrance-modal-reportlist-bottom'>
          <p className='hindrance-modal-reportlist-bottom-category-location'><span style={{fontWeight:'bold'}}>{report.category.label}</span> at {report.location}</p>
          <p className='hindrance-modal-reportlist-bottom-timeframe'>{report.postedAgo}</p>
        </div>
      </div>
      <div>
        {showModal 
          ? <ReportDetail report={report} onClose={() => setShowModal(false)}/>
          : <></>
        }
      </div>
    </div>
  );
}

export default Reports