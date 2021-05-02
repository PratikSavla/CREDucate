import React, {useEffect, useContext} from 'react';
import ApiService from './utils/apiService';
import Navbar from './components/layout/Navbar';
import { apiInstances } from './utils/api';
import jwt_decode from 'jwt-decode';
import Router from './components/Router';
import { AppContext,defaultAppState } from './utils/context';


function App() {

  const [appState, setAppState] = useContext(AppContext)

  useEffect(() => {
    const accessToken = ApiService.getAccessTokenFromLocalStorage();
    const didToken = ApiService.getDidTokenToLocalStorage();
    const user = ApiService.getUserToLocalStorage();

    if( accessToken ) {
      const jwtToken = jwt_decode(accessToken);
      /**
       * On component mount, check if user access token is valid.
       * If not, log out user on client side.
       * */
      if( (jwtToken.exp * 1000) <= new Date().getTime() ) {

        ApiService.removeAccessAndDidTokens()

        alert('Your JWT token has expired. Please, log in again.')

        setAppState(prevState => {
          return {
            ...prevState,
            isAuthenticated: false,
          }
        })

        return;
      }
      else {
        /**
         * Log in user on client side, set authorization bearer token.
         * */
        const userState = jwt_decode(user);
        ApiService.setAuthorizationBearer(accessToken);
        setAppState(prevState => {
          return {
            ...prevState,
            didToken: didToken || null,
            accessToken,
            isAuthenticated: true,
            username: jwt_decode(accessToken).username,
            ...userState
          }
        })
      }
    }

    apiInstances.forEach(instance => {
      /**
       * In case of 401 HTTP responses, remove tokens from localstorage
       * and reset app context state (basically, log out user on client side).
       * */
      instance.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if (error.response && 401 === error.response.status) {
          ApiService.removeAccessAndDidTokens()

          setAppState({
            ...appState,
            ...defaultAppState
          })

          alert('Your JWT token has expired. Please, log in again.')
          return Promise.reject(error);
        } else {
          return Promise.reject(error);
        }
      });
    })
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="">
      <Navbar isUserAuthenticated={appState.isAuthenticated}/>
      <Router isUserAuthenticated={appState.isAuthenticated} isInstitution={appState.isInstitution} isVerifier={appState.isVerifier}/>
    </div>
  )
}

export default App;