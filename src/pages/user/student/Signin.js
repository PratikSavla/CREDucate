import { useState, useContext } from "react";
import ApiService from '../../../utils/apiService';
import {AppContext} from '../../../utils/context';
import {Link, useHistory} from 'react-router-dom';
import {routes} from '../../../constants/routes';
import { Helmet } from 'react-helmet-async';
import M from 'materialize-css'

import sign from 'jwt-encode';

const StudentSignin = (props) => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ appState, setAppState ] = useContext(AppContext);
  const history = useHistory();

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
      M.toast({html : "Invalid Username or Password", displayLength : 1000, classes : 'red'})

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
      <h2>Student Sign In</h2>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="input-field col s12 l4 offset-l4">
          <i className="material-icons prefix">person</i>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          <label>Username</label>
          </div>
          <div className="input-field col s12 l4 offset-l4">
          <i className="material-icons prefix">lock</i>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <label>Password</label>
          </div>
        </div>
        <div className="col s12 l4 offset-l4">
        <button className="btn waves-effect waves-light  blue accent-4" type="submit" disabled={!validateForm()}>Login</button>
        <p>Don't have a student account? <Link to={routes.STUDENT_SIGNUP} className="indigo-text">Click here</Link></p>
        </div>
      </form>
    </div>
  );
}
 
export default StudentSignin;
