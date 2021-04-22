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
      <div className="links">
        <Link to="/">Home</Link>
        {appState.isAuthenticated && (
          <>
            < UserLogout></UserLogout>
          </>
        )}
        {!appState.isAuthenticated && (
          <>
            <Link to={routes.STUDENT_LOGIN}>Student SignIn</Link>
            <Link to={routes.STUDENT_SIGNUP}>Student SignUp</Link>
            <Link to={routes.INSTITUTION_LOGIN}>Institution SignIn</Link>
            <Link to={routes.INSTITUTION_SIGNUP}>Institution SignUp</Link>
          </>
        )}
      </div>
    </nav>
  );
}
 
export default Navbar;