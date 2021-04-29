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

  return (
    <div>
    <nav className="nav-wrapper indigo">
      <div className="container">
        <a href="/" className="brand-logo">Educate</a>
      <ul className="right">
        <li><Link to="/">Home</Link></li>
        {appState.isAuthenticated && (
          <>
            { !appState.isInstitution && <>
            { !appState.isVerifier && <li><Link to={routes.INSTITUTE}>Institutes</Link></li> }
            <li><a href="#messages" className="btn-floating indigo darken-4 z-depth-0 modal-trigger">
              <i className="material-icons">notifications</i>
              </a></li>
            <li><span className="badge white-text pink new">{notificationNumber}</span></li>
            </>}
            <li>< UserLogout /></li>
          </>
        )}
        {!appState.isAuthenticated && (
          <>
            <li><Link to={routes.STUDENT}>Student</Link></li>
            <li><Link to={routes.INSTITUTE}>Institution</Link></li>
            <li><Link to={routes.VERIFIER}>Verifier</Link></li>
          </>
        )}
      </ul>
      </div>
    </nav>
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