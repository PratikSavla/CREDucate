import React, {useContext} from 'react'
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import ApiService from '../../utils/apiService';
import {AppContext,defaultAppState} from '../../utils/context';
import M from 'materialize-css'

/**
 * Stateless component responsible for logging out user.
 * */
const UserLogout = () => {
  const [appState, setAppState] = useContext(AppContext)
  const history = useHistory();
  /**
   * Function for logging out user and updating app state to
   * reflect that action.
   * */
  const userLogOut = async () => {
    try {
      await ApiService.logout()

      M.toast({html : 'You have been successfully signed out from all devices.', displayLength : 1000, classes: ''});
 
      setAppState({
        ...appState,
        ...defaultAppState
      })

    } catch (error) {
      M.toast({html : error.message, displayLength : 1000, classes : 'red'})
    }
    history.push('/')
  }

  return (
    <li><Link className = 'collection-item navlinks waves-effect waves-light' to="/" onClick={userLogOut}>Logout</Link></li>
  )
}

export default UserLogout;
