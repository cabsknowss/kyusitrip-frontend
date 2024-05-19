import { useState, useEffect } from 'react'
import ModalHeader from "../../components/ModalHeader"
import ReportList from "../../components/hindrance/ReportList"
import reportService from '../../services/reportService'
import "../../assets/styles/modals.css"



const HindranceModal = (props) => {

  const {
    selectHindranceCenter
  } = props

  const [reports, setReports] = useState([])
  const [count, setCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  
  const timeComparison = (dateCreated) => {
    const now = new Date()
    const createdAt = new Date(dateCreated)
    const diffInMilliseconds = now - createdAt
    const diffInMinutes = Math.round(diffInMilliseconds / (60 * 1000))
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes === 1) {
      return '1 minute ago';
    } else if (diffInMinutes <= 60){
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes > 60 && diffInMinutes < 120) {
      return '1 hour ago'
    } else {
      return `${Math.round(diffInMinutes/60)} hours ago`
    }
  }

  
  useEffect(() => {
    let timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 60000);

    return () => clearTimeout(timer)
  }, []);


  useEffect(() => {
    reportService
    .getAll()
    .then((response) => {
      const updatedReports = response.data.map((report) => ({
        ...report,
        postedAgo: timeComparison(report.createdAt),
      }));

      console.log(updatedReports)
      setReports(updatedReports.reverse())
    })
    .catch ((error) => {
      console.log(error)
    })
  }, [count]);

  
  return (
    <>
      <ModalHeader title="Hindrance" />
      <div className="hindrance-modal-search">
        <div>
          <input 
            className="hindrance-modal-searchbar" 
            placeholder='Search places...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="hindrance-modal-buttons">
        <button className="hindrance-modal-newpost">NEW POSTS</button>
      </div>
      <div>
        <ReportList 
          reports={reports}
          searchQuery={searchQuery}
          selectHindranceCenter={selectHindranceCenter}
        />
      </div>
    </>
  );
};

export default HindranceModal;
