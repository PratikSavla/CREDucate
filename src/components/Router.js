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
import StudentVerification from '../pages/StudentVerification';
import IssueCredential from '../pages/IssueCredential';
import VerifierSignup from '../pages/user/verifier/Signup';
import VerifierSignin from '../pages/user/verifier/Signin';
import VerifierHome from '../pages/user/verifier/VerifierHome';
import Verify from '../pages/Verify';
import Institutes from './user/student/Institutes';
/**
 * Stateless component responsible for rendering public or private routes.
 * If user is authenticated, render private routes, otherwise render public routes.
 * Small note - there is a "/intro" route (not present in any navigation), which shows a simple textual and graphical overview
 * of what SSI is.
 * */
const Router = ({isUserAuthenticated, isInstitution, isVerifier}) => {
  // render public routes
  if( !isUserAuthenticated ) {
    return (
      <Switch>
        <Route exact path={routes.ROOT} component={Home} />
        <Route exact path={routes.STUDENT_SIGNUP} component={StudentSignup} />
        <Route exact path={[routes.STUDENT_LOGIN, routes.STUDENT]} component={StudentSignin} />
        <Route exact path={routes.INSTITUTION_SIGNUP} component={InstitutionSignup} />
        <Route exact path={[routes.INSTITUTION_LOGIN, routes.INSTITUTE]} component={InstitutionSignin} />      
        <Route exact path={routes.VERIFIER_SIGNUP} component={VerifierSignup} />
        <Route exact path={[routes.VERIFIER_LOGIN, routes.VERIFIER]} component={VerifierSignin} />
        <Route component={NotFound} />
      </Switch>
    )
  }

  if(isInstitution) {
    return (
      <Switch>
        <Route exact path={[routes.ROOT, routes.INSTITUTE]} component={InstitutionHome} />
        <Route path="/verify/:id" component={StudentVerification} />
        <Route path="/issue-credential/:id" component={IssueCredential} />
        <Route component={NotFound}/>
      </Switch>
    )
  }

  if(isVerifier) {
    return (
      <Switch>
        <Route exact path={[routes.ROOT, routes.VERIFIER]} component={VerifierHome} />
        <Route path="/verify/:id" component={Verify} />
        <Route component={NotFound}/>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path={[routes.ROOT, routes.STUDENT]} component={StudentHome} />
      <Route exact path={routes.INSTITUTE} component={Institutes}/>
      <Route component={NotFound}/>
    </Switch>
  )
}

export default Router;
