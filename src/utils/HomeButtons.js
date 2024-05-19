import ReportIcon from '../assets/img/report-icon.svg'
import RouteIcon from '../assets/img/route-icon.svg'
import HindranceIcon from '../assets/img/hindrance-icon.svg'
import MenuIcon from '../assets/img/menu-icon.svg'



const HomeButtons = (props) => {
  return (
    <>
      {props.routeReport ? <button className="home-btn" onClick={() => props.btnModalClick('report')}><img className="home-icon" src={ ReportIcon } alt=''/> report </button> : <></>}
      {props.routePlanner ? <button className="home-btn" onClick={() => props.btnModalClick('planner')}><img className="home-icon" src={ RouteIcon } alt=''/> planner </button> : <></>}
      {props.routeUpdate ? <button className="home-btn" onClick={() => props.btnModalClick('updates')}><img className="home-icon" src={ HindranceIcon } alt=''/> hindrance </button> : <></>}
      {props.routeMenu ? <button className="home-btn" onClick={() => props.btnModalClick('menu')}><img className="home-icon" src={ MenuIcon } alt=''/> menu </button> : <></>}
    </>
  )
}

export default HomeButtons
