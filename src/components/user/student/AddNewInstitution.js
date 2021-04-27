import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ApiService from '../../../utils/apiService';
import {AppContext} from "../../../utils/context";

export default function AddNewInstitution() {
  const [institutions, setInstitutions] = useState([]);
  const [selected, setSelected] = useState('None');
  const [appState] = useContext(AppContext);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    ApiService.getInstitutionsForSelection(appState._id,signal)
      .then(data => setInstitutions(data))
      .catch(err => console.log(err));
    return () => signal.cancel("axios request cancelled");
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  //{cancelToken: signal.token,}
  const handelSubmit = async (e) => {
    e.preventDefault();
    if(selected === "None") {
      window.alert('Must select a institute');
      return
    }
    const data = await ApiService.addStudentToInstitution({institutionID:selected, studentID:appState._id})

    console.log("relation added", data);
  }
  return (
    <div>
      <h2>Add New Institution</h2>
      <form onSubmit={handelSubmit}>
        <select name="Institutions" onChange={(e) => setSelected(e.target.value)} value={selected}>
          <option value="None">None</option>
          { institutions.map(institution => (
            <option key={institution._id} value={institution._id}>{institution.name}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
