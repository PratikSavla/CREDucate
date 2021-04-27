// import useFetch from "../utils/useFetch";

import { useState, useContext } from "react";
import ApiService from '../../../utils/apiService';
import {AppContext} from '../../../utils/context';
import {useHistory} from 'react-router-dom';
import {routes} from '../../../constants/routes';

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
    <div className="home">
      <h1>Student Signin</h1>
      <form onSubmit={onSubmit}>
        <label><b>Username</b></label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />

        <label><b>Password</b></label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

        <button type="submit" disabled={!validateForm()}>Login</button>
      </form>
    </div>
  );
}
 
export default StudentSignin;