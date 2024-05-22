import { useEffect, useState } from 'react'
import Select from "react-select"
import ModalHeader from "../../components/ModalHeader"
import reportService from '../../services/reportService'
import "../../assets/styles/modals.css"
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")



const ReportModal = (props) => {

  const {
    onMarkLocation,
    onLocationSelect,
    reportData,
    selectReportMarker,
    selectMapZoom,
  } = props

  const reportCategory = [
    { value: 1, label: "Traffic" },
    { value: 2, label: "Hazard" },
    { value: 3, label: "Accident" },
    { value: 4, label: "Flood" },
    { value: 5, label: "Closure" }
  ]


  const [location, setLocation] = useState('')
  const [category, setCategory] = useState(null)
  const [description, setDescription] = useState('')
  const [msg, setMsg] = useState("");
  const [error, setError] = useState('')


  const clearInputFields = () => {
    setLocation('')
    setCategory(null)
    setDescription('')
    onLocationSelect(null)
    selectReportMarker(null)
    selectMapZoom(14)
  }


  useEffect(() => {
    if (reportData) {
      setLocation(reportData.address.results[0].formatted_address)
    }
  }, [reportData])

  const handleMarkLocation = () => {
    setError('')
    setMsg('')
    onMarkLocation(true)
    setLocation("Mark a Road Incident on the map")
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (reportData) {
      const latitude = reportData.lat
      const longitude = reportData.lng
      const latLng = { lat: latitude, lng: longitude }
      const data = {
        latLng,
        description,
        category,
      }

      reportService
        .create(data)
        .then((response) => {
          setMsg(response.message)
          setError('')
          clearInputFields()
          socket.emit("send_report", {message: "A user reported an incident"})
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setError(error.response.data.message)
            setMsg("")
          }
        })
    } else {
      setError('Mark a location before submitting')
    }
  }


  return (
    <>
      <ModalHeader title="Report" />
      <h3 className='report-modal-main-title'>Report Road Incidents</h3>
      <div className="report-modal-main">
        <div className="report-modal-instruction">
          <p>
            Report traffic and other road incidents. Make sure to mark the location,
            set proper titles, select a category, and describe the situation.
          </p>
        </div>


        <div className="report-modal-form">
          <div className="report-modal-mark">
            <button onClick={handleMarkLocation} className="report-modal-mark-button">Click Here to Mark Location</button>
            <textarea
              id="report-location"
              className="report-modal-mark-location"
              type="text"
              value={location}
              onChange={e => {
                setLocation(e.target.value)
                setMsg('')
                setError('')
              }} 
              placeholder="Location"
              disabled
            ></textarea>
          </div>

          <div className="report-modal-category-div">
            <div className="report-modal-category">
              <p><span className='red-asterisk'>*</span>Category:</p>
            </div>
            <Select
              id="report-category"
              className="report-modal-select"
              options={reportCategory}
              isSearchable={true}
              value={category}
              onChange={(selectedOption) => setCategory(selectedOption)}
              placeholder="Flood, Traffic Jam, Road Block?"
              styles={customStyles}
            />
          </div>

          <div className="report-modal-body-div">
            <div className="report-modal-body">
              <p><span className='red-asterisk'>*</span>Short Description:</p>
            </div>
            <div className="report-modal-body-input-div">
              <textarea
                id="report-description"
                className="report-modal-body-input"
                type="text"
                value={description}
                onChange={e => {
                  setDescription(e.target.value)
                  setMsg('')
                  setError('')
                }} 
                placeholder="Describe the situation"
              ></textarea>
            </div>
          </div>

          {error && <div className="error-msg">{error}</div>}
          {msg && <div className="success-msg">{msg}</div>}

          <div className="report-modal-button">
            <button onClick={handleSubmit} className="report-modal-submit">SUBMIT</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportModal;

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid black',
    height: '35px',
  }),
};
