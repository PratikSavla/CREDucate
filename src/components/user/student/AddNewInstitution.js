import React, { useContext, useEffect, useState } from 'react'
import ApiService from '../../../utils/apiService';
import {AppContext} from "../../../utils/context";

export default function AddNewInstitution() {
  const [institutions, setInstitutions] = useState([]);
  const [selected, setSelected] = useState('Undefined');
  const [appState] = useContext(AppContext);

  useEffect(() => {
    ApiService.getAllInstitutions()
      .then(data => setInstitutions(data))
      .catch(err => console.log(err));
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const data = await ApiService.addStudentToInstitution({institutionID:selected, studentID:appState._id})

    console.log("relation added", data);
  }
  return (
    <div>
      <h1>Add New Institution</h1>
      <form onSubmit={handelSubmit}>
        <select name="Institutions" onChange={(e) => setSelected(e.target.value)} value={selected}>
          { institutions.map(institution => (
            <option key={institution._id} value={institution._id}>{institution.name}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
