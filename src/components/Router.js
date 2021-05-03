import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../constants/routes';

const Home = lazy(() => import( '../pages/Home'));
const InstitutionSignin = lazy(() => import( '../pages/user/institution/Signin'));
const InstitutionSignup = lazy(() => import( '../pages/user/institution/Signup'));
const NotFound = lazy(() => import( '../pages/NotFound'));
const StudentSignup = lazy(() => import( '../pages/user/student/Signup'));
const StudentSignin = lazy(() => import( '../pages/user/student/Signin'));
const StudentHome = lazy(() => import( '../pages/user/student/StudentHome'));
const InstitutionHome = lazy(() => import( '../pages/user/institution/InstitutionHome'));
const StudentVerification = lazy(() => import( '../pages/StudentVerification'));
const IssueCredential = lazy(() => import( '../pages/IssueCredential'));
const VerifierSignup = lazy(() => import( '../pages/user/verifier/Signup'));
const VerifierSignin = lazy(() => import( '../pages/user/verifier/Signin'));
const VerifierHome = lazy(() => import( '../pages/user/verifier/VerifierHome'));
const Verify = lazy(() => import( '../pages/Verify'));
const Institutes = lazy(() => import( './user/student/Institutes'));
const StudentDetail = lazy(() => import( './user/institution/StudentDetail'));
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
      <Suspense fallback={<div>Page is Loading...</div>}>
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
      </Suspense>
    )
  }

  if(isInstitution) {
    return (
      <Suspense fallback={<div>Page is Loading...</div>}>
        <Switch>
          <Route exact path={[routes.ROOT, routes.INSTITUTE]} component={InstitutionHome} />
          <Route path="/verify/:id" component={StudentVerification} />
          <Route path="/issue-credential/:id" component={IssueCredential} />
          <Route path="/student-detail/:id" component={StudentDetail}></Route>
          <Route component={NotFound}/>
        </Switch>
      </Suspense>
    )
  }

  if(isVerifier) {
    return (
      <Suspense fallback={<div>Page is Loading...</div>}>
        <Switch>
          <Route exact path={[routes.ROOT, routes.VERIFIER]} component={VerifierHome} />
          <Route path="/verify/:id" component={Verify} />
          <Route component={NotFound}/>
        </Switch>
      </Suspense>
    )
  }

  return (
    <Suspense fallback={ <div class="progress">
        <div class="indeterminate"></div>
      </div>
    }>
      <Switch>
        <Route exact path={[routes.ROOT, routes.STUDENT]} component={StudentHome} />
        <Route exact path={routes.INSTITUTE} component={Institutes}/>
        <Route component={NotFound}/>
      </Switch>
    </Suspense>
  )
}

export default Router;
