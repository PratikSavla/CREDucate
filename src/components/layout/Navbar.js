import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import {AppContext} from "../../utils/context";
import UserLogout from "../user/Logout";
import DisplayMessages from "../user/student/DisplayMessages";
import DisplayResponses from "../user/verifier/DisplayResponses";

const Navbar = () => {
  const [ appState ] = useContext(AppContext);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [mobileNavbar, setMobileNavbar] = useState(false);

  return (
    <div>
    <nav className="nav-wrapper" style = {{backgroundColor:' #003153'}}>
      <div className="container">
        <a href="/" className="brand-logo">CREDucate</a>
        <span className="sidenav-trigger hide-on-large-only" onClick={() => {setMobileNavbar(!mobileNavbar)}}><i className="material-icons">menu</i></span>
      <ul className="right hide-on-med-and-down">
        <li><Link className = 'navlinks waves-effect waves-light' to="/">Home</Link></li>
        {appState.isAuthenticated && (
          <>
            { !appState.isInstitution && <>
            { !appState.isVerifier && <li><Link  className = 'navlinks waves-effect waves-light'  to={routes.INSTITUTE}>Institutes</Link></li> }
            <li><a href="#messages" className="btn-floating blue accent-4 z-depth-0 modal-trigger">
              <i className="material-icons">notifications</i>
              </a></li>
            <li><span className="badge white-text pink new">{notificationNumber}</span></li>
            </>}
            <li>< UserLogout /></li>
          </>
        )}
        {!appState.isAuthenticated && (
          <>
            <li><Link className = 'navlinks waves-effect waves-light' to={routes.STUDENT}>Student</Link></li>
            <li><Link className = 'navlinks waves-effect waves-light' to={routes.INSTITUTE}>Institution</Link></li>
            <li><Link className = 'navlinks waves-effect waves-light' to={routes.VERIFIER}>Verifier</Link></li>
          </>
        )}
      </ul>
      </div>
    </nav>
    <ul className={`collection ${mobileNavbar?"hide-on-large-only":"hide"}`}>
        <li><Link className="collection-item navlinks waves-effect waves-light"to="/">Home</Link></li>
        {appState.isAuthenticated && (
          <>
            { !appState.isInstitution && <>
              { !appState.isVerifier && <li><Link className = 'collection-item navlinks waves-effect waves-light' to={routes.INSTITUTE}>Institutes</Link></li> }
            <li className="collection-item"><a href="#messages" className="btn-floating indigo darken-4 z-depth-0 modal-trigger">
              <i className="material-icons">notifications</i>
              </a><span className="badge white-text pink new">{notificationNumber}</span></li>
            </>}
            < UserLogout />
          </>
        )}
        {!appState.isAuthenticated && (
          <>
            <li className="collection-item navlinks waves-effect waves-light"><Link to={routes.STUDENT}>Student</Link></li>
            <li className="collection-item navlinks waves-effect waves-light"><Link to={routes.INSTITUTE}>Institution</Link></li>
            <li className="collection-item navlinks waves-effect waves-light"><Link to={routes.VERIFIER}>Verifier</Link></li>
          </>
        )}
      </ul>
    <div className="modal black-text" id="messages">
      <div className="modal-content">
      {  appState.isAuthenticated &&  !appState.isInstitution && <>
        { appState.isVerifier && < DisplayResponses setNotificationNumber={setNotificationNumber}/>}
        { !appState.isVerifier && < DisplayMessages setNotificationNumber={setNotificationNumber}/>}
      </>
      }
      <div className="modal-footer">
        <button className="modal-close btn orange">Close</button>
      </div>
      </div>
    </div>
    </div>
  );
}
 
export default Navbar;