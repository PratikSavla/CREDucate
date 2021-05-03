import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ApiService from '../../../utils/apiService';
import {AppContext} from "../../../utils/context";
import {useHistory} from 'react-router-dom';
<<<<<<< HEAD

export default function AddNewInstitution() {
  const [institutions, setInstitutions] = useState([]);
  const [selected, setSelected] = useState("None");
=======
import M from 'materialize-css'

export default function AddNewInstitution() {
  const [institutions, setInstitutions] = useState([]);
  const [selected, setSelected] = useState("Select");
>>>>>>> origin/master
  const [appState] = useContext(AppContext);
  const [disableButton, setDisableButton] = useState(false);
  const history = useHistory()

  useEffect(() => {
    const signal = axios.CancelToken.source();
    ApiService.getInstitutionsForSelection(appState._id,signal)
      .then(data => setInstitutions(data))
      .catch(err => console.log(err));
    return () => signal.cancel("axios request cancelled");
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

<<<<<<< HEAD
  const handelSubmit = async (e) => {
    setDisableButton(true)
    e.preventDefault();
    if(selected === "None") {
      window.alert('Must select a institute');
=======
  const handleSubmit = async (e) => {
    setDisableButton(true)
    e.preventDefault();
    if(selected === "Select") {
     M.toast({html:'You must select an institute'});
>>>>>>> origin/master
      return
    }
    const data = await ApiService.addStudentToInstitution({institutionID:selected, studentID:appState._id})
    console.log(data);
    setInstitutions(institutions.filter(institution => institution._id!==selected));
    setDisableButton(false);
    // window.alert("Institution Added");
    history.push('/');
  }
  return (
    <div>
      <h2>Add New Institution</h2>
<<<<<<< HEAD
      <form onSubmit={handelSubmit } className="row valign-wrapper">
        <div className="input-field col s12 l6">

          <select className="browser-default" onChange={(e) => setSelected(e.target.value)} value={selected}>
            <option value="None">None</option>
=======
      <form onSubmit={handleSubmit } className="row valign-wrapper">
        <div className="input-field col s12 l6">

          <select className="browser-default" onChange={(e) => setSelected(e.target.value)} value={selected}>
            <option value="Select">Select</option>
>>>>>>> origin/master
            { institutions.map(institution => (
              <option key={institution._id} value={institution._id}>{institution.name}</option>
            ))}
          </select>
        </div>
        <div className="col s12 l6">
<<<<<<< HEAD
        <button className="btn waves-effect waves-light indigo" disabled={disableButton} type="submit">Submit</button>
=======
        <button className="btn waves-effect waves-light blue accent-4" disabled={disableButton} type="submit">Submit</button>
>>>>>>> origin/master
        </div>
      </form>
    </div>
  )
}
