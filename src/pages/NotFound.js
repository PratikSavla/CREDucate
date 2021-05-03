import { Link } from "react-router-dom";
import { routes } from "../constants/routes";

const NotFound = () => {
  return (
    <div className="container">
      <h2>404 - Page Not found</h2>
      <Link to={routes.ROOT}><h4>Go Home</h4></Link>
    </div>
  );
}
 
export default NotFound;
