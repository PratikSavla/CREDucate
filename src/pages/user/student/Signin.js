// import useFetch from "../utils/useFetch";

import { useState, useContext } from "react";
import ApiService from '../../../utils/apiService';
import {AppContext} from '../../../utils/context';
import {Link, useHistory} from 'react-router-dom';
import {routes} from '../../../constants/routes';
import { Helmet } from 'react-helmet-async';

import sign from 'jwt-encode';

// import useFetch from "../utils/useFetch";

const StudentSignin = (props) => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ appState, setAppState ] = useContext(AppContext);
  const history = useHistory();
  // const [ requestToken, setRequestToken ] = useState('');

  // if(props.location.search.length>0){
  //   const {search} = props.location;
  //   if(search.slice(0,7)==="?share=") setRequestToken(search.split("="))
  // }
    const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const {accessToken, did, name, contact, address, VCIssued, _id} = await ApiService.logInStudent(username, password)
      const user = sign({name, contact, address, VCIssued, _id, isInstitution:false,isVerifier:false}, 'educate');

      ApiService.clientSideLogIn(accessToken, did, user);

      setAppState({
        ...appState,
        isAuthenticated: true,
        isInstitution:false,
        accessToken,
        didToken: did,
        username,
        name, contact, address, VCIssued, _id, 
      })

      history.push(`${routes.STUDENT}${props.location.search}`);

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
        <title>Student - Login</title>
      </Helmet>
<<<<<<< HEAD
      <h2>Student Signin</h2>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="input-field col s12 l4 offset-l4">
=======
      <h2>Student Sign In</h2>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="input-field col s12 l4 offset-l4">
          <i class="material-icons prefix">person</i>
>>>>>>> origin/master
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          <label>Username</label>
          </div>
          <div className="input-field col s12 l4 offset-l4">
<<<<<<< HEAD
=======
          <i class="material-icons prefix">lock</i>
>>>>>>> origin/master
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <label>Password</label>
          </div>
        </div>
        <div className="col s12 l4 offset-l4">
<<<<<<< HEAD
        <button className="btn waves-effect waves-light indigo" type="submit" disabled={!validateForm()}>Login</button>
=======
        <button className="btn waves-effect waves-light  blue accent-4" type="submit" disabled={!validateForm()}>Login</button>
>>>>>>> origin/master
        <p>Don't have a student account? <Link to={routes.STUDENT_SIGNUP} className="indigo-text">Click here</Link></p>
        </div>
      </form>
    </div>
  );
}
 
export default StudentSignin;
