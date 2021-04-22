import Verify from '../pages/Verify';
import Issue from '../pages/Issue';
import Holder from '../pages/Holder';
import Home from '../pages/Home';
import InstitutionSignin from '../pages/user/institution/Signin';
import InstitutionSignup from '../pages/user/institution/Signup';
// import SignupConfirm from '../pages/user/SignupConfirm';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../constants/routes';
import NotFound from '../pages/NotFound';
import StudentSignup from '../pages/user/student/Signup';
import StudentSignin from '../pages/user/student/Signin';
import StudentHome from '../pages/user/student/StudentHome';
import InstitutionHome from '../pages/user/institution/InstitutionHome';
/**
 * Stateless component responsible for rendering public or private routes.
 * If user is authenticated, render private routes, otherwise render public routes.
 * Small note - there is a "/intro" route (not present in any navigation), which shows a simple textual and graphical overview
 * of what SSI is.
 * */
const Router = ({isUserAuthenticated, isInstitution}) => {
  // render public routes
  if( !isUserAuthenticated ) {
    return (
      <Switch>
        <Route exact path={routes.INTRO} component={Home} />
        <Route exact path={routes.STUDENT_SIGNUP} component={StudentSignup} />
        <Route exact path={routes.STUDENT_LOGIN} component={StudentSignin} />
        <Route exact path={routes.INSTITUTION_SIGNUP} component={InstitutionSignup} />
        <Route exact path={routes.INSTITUTION_LOGIN} component={InstitutionSignin} />
        <Route component={Home} />
      </Switch>
    )
  }

  const PrivateHome = isInstitution?InstitutionHome:StudentHome;
  // render private routes
  return (
    <Switch>
      <Route exact path={routes.ROOT} component={PrivateHome} />
      <Route exact path={routes.ISSUER} component={Issue} />
      <Route exact path={routes.VERIFIER} component={Verify} />
      <Route exact path={routes.HOLDER} component={Holder} />
      <Route component={NotFound}/>
    </Switch>
  )
}

export default Router;
