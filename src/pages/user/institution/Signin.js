import { Helmet } from 'react-helmet-async';
<<<<<<< HEAD

=======
>>>>>>> origin/master
import { useState, useContext } from "react";
import ApiService from '../../../utils/apiService';
import {AppContext} from '../../../utils/context';
import {Link, useHistory} from 'react-router-dom';
import {routes} from '../../../constants/routes';
<<<<<<< HEAD
=======
import M from 'materialize-css'
>>>>>>> origin/master

import sign from 'jwt-encode';


const InstitutionSignin = () => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ appState, setAppState ] = useContext(AppContext);
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const {accessToken, did, name, contact, address, VCIssued, _id} = await ApiService.logInInstitution(username, password)
  
      const user = sign({name, contact, address, VCIssued, _id, isInstitution:true,isVerifier:false}, 'educate');

      ApiService.clientSideLogIn(accessToken, did, user);

      setAppState({
        ...appState,
        isAuthenticated: true,
        isInstitution:true,
        accessToken,
        didToken: did,
        username,
        name, contact, address, VCIssued, _id
      })

      history.push(routes.ROOT);

    } catch (error) {
<<<<<<< HEAD
      ApiService.alertWithBrowserConsole(error.message)
=======
      M.toast({html : error.message, displayLength : 1000, classes : 'red'})
>>>>>>> origin/master
    }
  }

  /**
   * Simple form validation function.
   * */
  function validateForm() {
    return username.length > 0 && password.length > 0
  }

  return (
    <div className="center">
      <Helmet>
        <title>Institution - Login</title>
      </Helmet>
<<<<<<< HEAD
      <h2>Institution Login</h2>
      <form onSubmit={onSubmit} className="row">
      <div className="input-field col s12 l4 offset-l4">
        <label>Username</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="input-field col s12 l4 offset-l4">
=======
      <h2>Institution Sign In</h2>
      <form onSubmit={onSubmit} className="row">
      <div className="input-field col s12 l4 offset-l4">
        <i class="material-icons prefix">person</i>
        <label>Username</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className="input-field col s12 l4 offset-l4">
        <i class="material-icons prefix">lock</i>
>>>>>>> origin/master
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="col s12 l4 offset-l4">
<<<<<<< HEAD
        <button className="btn waves-effect waves-light indigo" type="submit" disabled={!validateForm()}>Login</button>
=======
        <button className="btn waves-effect waves-light  blue accent-4" type="submit" disabled={!validateForm()}>Login</button>
>>>>>>> origin/master
        <p>Don't have an institution account? <Link to={routes.INSTITUTION_SIGNUP} className="indigo-text">Click here</Link></p>
        </div>
      </form>
    </div>
  );
}
 
export default InstitutionSignin;
