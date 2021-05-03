// import useFetch from "../utils/useFetch";
<<<<<<< HEAD

=======
import M from 'materialize-css'
>>>>>>> origin/master
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { routes } from "../../../constants/routes";
import ApiService from "../../../utils/apiService";
import { AppContext } from "../../../utils/context";
// import useFetch from "../utils/useFetch";
<<<<<<< HEAD

import sign from 'jwt-encode';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const VerifierSignup = () => {

=======
import sign from 'jwt-encode';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Tooltip from '@material-ui/core/Tooltip';

const VerifierSignup = () => {
>>>>>>> origin/master
  const [data, setData] = useState({
    username:'',password:'',confirmPassword:'',
    name:'',contact:'',address:''
  })

  const [appState, setAppState] = useContext(AppContext);
  const history = useHistory();

  /**
   * Function executed on form submit if form validation is passed.
   * */
  const onSubmit = async (event) => {
    event.preventDefault();

    // notify user if "password" and "confirm password" fields don't match
    if (data.password !== data.confirmPassword) {
<<<<<<< HEAD
      alert('Passwords don\'t match!')
=======
      M.toast({html : 'Passwords don\'t match!', displayLength : 1000})
>>>>>>> origin/master
      return
    }

    try {
      // perform user registration
      const tokenData = await ApiService.signUpVerifier(data)
      // check if user used arbitrary username, instead of a phone number or email address
      const isUsername = !data.username.startsWith('+') && data.username.indexOf('@') === -1

      // this app currently supports arbitrary username
      if (isUsername) {
        const {accessToken, did, name, contact, address, VCIssued, _id} = tokenData;

        const user = sign({name, contact, address, VCIssued, _id, isInstitution:false, isVerifier:true}, 'educate');
        ApiService.clientSideLogIn(accessToken, did, user);

        setAppState({
          ...appState,
          isInstitution: false,
          isAuthenticated: true,
          accessToken,
          didToken: did,
          username: data.username,
          isVerifier:true,
          name, contact, address, VCIssued, _id,
        })

        history.push(routes.ROOT);
      }
      else {
<<<<<<< HEAD
        alert('Please provide a valid username (phone numbers and emails addresses are not allowed).')
=======
        M.toast({html : 'Please provide a valid username (phone numbers and emails addresses are not allowed).', displayLength : 1000})
>>>>>>> origin/master
      }
    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message)
    }
  }


  function validateForm() {
    return data.username.trim().length > 0 && data.password.trim().length >= 6 && data.confirmPassword.trim().length >= 6
  }

  return (
    <div className="center">
      <Helmet>
        <title>Verifier - Signup</title>
      </Helmet>
<<<<<<< HEAD
      <h2>Verifier Signup</h2>
      <form onSubmit={onSubmit} className="row">
      <div className="input-field col s12 l4 offset-l4">
        <label>Username</label>
        <input type="text" value={data.username} onChange={e => {setData({...data, username:e.target.value})}} />
        </div>
        <div className="input-field col s12 l4 offset-l4">
=======
      <h2>Verifier Sign Up</h2>
      <form onSubmit={onSubmit} className="row">
      <div className="input-field col s12 l4 offset-l4">
      <i className="material-icons prefix">person</i>
        <label>Username</label>
        <input type="text" value={data.username} onChange={e => {setData({...data, username:e.target.value})}} />
        <Tooltip title = {<span className = 'tooltip-text'>Username must not contain spaces, +,  _ and @</span>} >
            <i className='material-icons prefix'>info_outline</i>
        </Tooltip>
        </div>
        <div className="input-field col s12 l4 offset-l4">
        <i className="material-icons prefix">person</i>
>>>>>>> origin/master
        <label>Name</label>
        <input type="text" value={data.name} onChange={e => {setData({...data, name:e.target.value})}} />
        </div>
        <div className="input-field col s12 l4 offset-l4">
<<<<<<< HEAD
=======
        <i className="material-icons prefix">location_on</i>
>>>>>>> origin/master
        <label>Address</label>
        <input type="text" value={data.address} onChange={e => {setData({...data, address:e.target.value})}} />
        </div>
        <div className="input-field col s12 l4 offset-l4">
<<<<<<< HEAD
=======
        <i className="material-icons prefix">local_phone</i>
>>>>>>> origin/master
        <label>Contact</label>
        <input type="text" value={data.contact} onChange={e => {setData({...data, contact:e.target.value})}} />
        </div>
        <div className="input-field col s12 l4 offset-l4">
<<<<<<< HEAD
        <label>Password</label>
        <input type="password" value={data.password} onChange={e => {setData({...data, password:e.target.value})}} />
        </div>
        <div className="input-field col s12 l4 offset-l4">
=======
        <i className="material-icons prefix">lock</i>
        <label>Password</label>
        <input type="password" value={data.password} onChange={e => {setData({...data, password:e.target.value})}} />
        <Tooltip title = {<span className = 'tooltip-text'>Password must contain atleast 6 characters, atleast 1 alphabet and atleast 1 number</span>} >
            <i className='material-icons prefix'>info_outline</i>
        </Tooltip>
        </div>
        <div className="input-field col s12 l4 offset-l4">
        <i className="material-icons prefix">lock</i>
>>>>>>> origin/master
        <label>Confirm Password</label>
        <input type="password" value={data.confirmPassword} onChange={e => {setData({...data, confirmPassword:e.target.value})}} />
        </div>
        <div className="input-field col s12 l4 offset-l4">
<<<<<<< HEAD
        <button className="btn waves-effect waves-light indigo" type="submit" disabled={!validateForm()}>SignUp</button>
=======
        <button className="btn waves-effect waves-light  blue accent-4" type="submit" disabled={!validateForm()}>SignUp</button>
>>>>>>> origin/master
        <p>Already have an verifier account? <Link to={routes.VERIFIER_LOGIN} className="indigo-text">Click here</Link></p>

        </div>
      </form>
    </div>
  );
}
 
export default VerifierSignup;
