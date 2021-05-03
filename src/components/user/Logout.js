import React, {useContext} from 'react'
import { useHistory } from 'react-router';
<<<<<<< HEAD
import ApiService from '../../utils/apiService';
import {AppContext,defaultAppState} from '../../utils/context';
=======
import { Link } from "react-router-dom";
import ApiService from '../../utils/apiService';
import {AppContext,defaultAppState} from '../../utils/context';
import M from 'materialize-css'
>>>>>>> origin/master

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

<<<<<<< HEAD
      alert('You have been successfully signed out from all devices.')

=======
      M.toast({html : 'You have been successfully signed out from all devices.', displayLength : 1000, classes: ''});
 
>>>>>>> origin/master
      setAppState({
        ...appState,
        ...defaultAppState
      })

    } catch (error) {
<<<<<<< HEAD
      ApiService.alertWithBrowserConsole(error.message)
=======
      M.toast({html : error.message, displayLength : 1000, classes : 'red'})
>>>>>>> origin/master
    }
    history.push('/')
  }

  return (
<<<<<<< HEAD
    <span className='logout' onClick={userLogOut}>Logout</span>
=======
    <li><Link className = 'collection-item navlinks waves-effect waves-light' to="/" onClick={userLogOut}>Logout</Link></li>
>>>>>>> origin/master
  )
}

export default UserLogout;
