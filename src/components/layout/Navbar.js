import { useContext } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import {AppContext} from "../../utils/context";
import UserLogout from "../user/Logout";

const Navbar = () => {

  const [ appState ] = useContext(AppContext);

  return (
    <nav className="navbar">
      <h1>Educate</h1>
      <ul className="links">
        <li><Link to="/">Home</Link></li>
        {appState.isAuthenticated && (
          <>
            <li>< UserLogout></UserLogout></li>
          </>
        )}
        {!appState.isAuthenticated && (
          <>
            <li><Link to={routes.STUDENT_LOGIN}>Student LogIn</Link></li>
            <li><Link to={routes.STUDENT_SIGNUP}>Student SignUp</Link></li>
            <li><Link to={routes.INSTITUTION_LOGIN}>Institution LogIn</Link></li>
            <li><Link to={routes.INSTITUTION_SIGNUP}>Institution SignUp</Link></li>
            <li><Link to={routes.VERIFIER_LOGIN}>Verifier LogIn</Link></li>
            <li><Link to={routes.VERIFIER_SIGNUP}>Verifier SignUp</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
 
export default Navbar;