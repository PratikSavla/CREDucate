// import useFetch from "../utils/useFetch";

import { useState, useContext } from "react";
import ApiService from '../../../utils/apiService';
import {AppContext} from '../../../utils/context';
import {Link, useHistory} from 'react-router-dom';
import {routes} from '../../../constants/routes';
import { Helmet } from 'react-helmet-async';

import sign from 'jwt-encode';

// import useFetch from "../utils/useFetch";

const VerifierSignin = () => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ appState, setAppState ] = useContext(AppContext);
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const {accessToken, did, name, contact, address, VCIssued, _id} = await ApiService.logInVerifier(username, password)
      const user = sign({name, contact, address, VCIssued, _id, isInstitution:false,isVerifier:true}, 'educate');

      ApiService.clientSideLogIn(accessToken, did, user);

      setAppState({
        ...appState,
        isAuthenticated: true,
        isInstitution:false,
        accessToken,
        didToken: did,
        username,
        isVerifier:true,
        name, contact, address, VCIssued, _id, 
      })

      history.push(routes.ROOT);

    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message)
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
        <title>Verifier - Login</title>
      </Helmet>
<<<<<<< HEAD
      <h2>Verifier Signin</h2>
      <form onSubmit={onSubmit} className="row">
        <div className="input-field col s12 l4 offset-l4">
=======
      <h2>Verifier Sign In</h2>
      <form onSubmit={onSubmit} className="row">
        <div className="input-field col s12 l4 offset-l4">
        <i class="material-icons prefix">person</i>
>>>>>>> origin/master
        <label>Username</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="input-field col s12 l4 offset-l4">
<<<<<<< HEAD
=======
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
        <p>Don't have a verifier account? <Link to={routes.VERIFIER_SIGNUP} className="indigo-text">Click here</Link></p>
        </div>
      </form>
    </div>
  );
}
 
export default VerifierSignin;
