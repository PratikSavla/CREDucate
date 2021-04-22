// import useFetch from "../utils/useFetch";

import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { routes } from "../../../constants/routes";
import ApiService from "../../../utils/apiService";
import { AppContext } from "../../../utils/context";
// import useFetch from "../utils/useFetch";
import sign from 'jwt-encode';

const InstitutionSignup = () => {

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
      alert('Passwords don\'t match!')
      return
    }

    try {
      // perform user registration
      const tokenData = await ApiService.signUpInstitution(data)
      // check if user used arbitrary username, instead of a phone number or email address
      const isUsername = !data.username.startsWith('+') && data.username.indexOf('@') === -1

      // this app currently supports arbitrary username
      if (isUsername) {
        const {accessToken, did, name, contact, address, VCIssued, _id} = tokenData;

        const user = sign({name, contact, address, VCIssued, _id, isInstitution:true}, 'educate');

        ApiService.clientSideLogIn(accessToken, did, user);

        setAppState({
          ...appState,
          isInstitution: true,
          isAuthenticated: true,
          accessToken,
          didToken: did,
          username: data.username,
          name, contact, address, VCIssued, _id
        })

        history.push(routes.ROOT);
      }
      else {
        alert('Please provide a valid username (phone numbers and emails addresses are not allowed).')
      }
    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message)
    }
  }


  function validateForm() {
    return data.username.trim().length > 0 && data.password.trim().length >= 6 && data.confirmPassword.trim().length >= 6
  }

  return (
    <div className="home">
      <h1>Institution Signup</h1>
      <form onSubmit={onSubmit}>
        <label><b>Username</b></label>
        <input type="text" value={data.username} onChange={e => {setData({...data, username:e.target.value})}} />
        <br/>
        <label><b>Name</b></label>
        <input type="text" value={data.name} onChange={e => {setData({...data, name:e.target.value})}} />
        <br/>
        <label><b>Address</b></label>
        <input type="text" value={data.address} onChange={e => {setData({...data, address:e.target.value})}} />
        <br/>
        <label><b>Contact</b></label>
        <input type="text" value={data.contact} onChange={e => {setData({...data, contact:e.target.value})}} />
        <br/>
        <label><b>Password</b></label>
        <input type="password" value={data.password} onChange={e => {setData({...data, password:e.target.value})}} />
        <br/>
        <label><b>Confirm Password</b></label>
        <input type="password" value={data.confirmPassword} onChange={e => {setData({...data, confirmPassword:e.target.value})}} />
        <br/>
        <button type="submit" disabled={!validateForm()}>SignUp</button>
      </form>
    </div>
  );
}
 
export default InstitutionSignup;
