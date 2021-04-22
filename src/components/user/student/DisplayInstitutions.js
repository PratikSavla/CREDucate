import React, { useContext, useState, useEffect } from 'react'
import {AppContext} from "../../../utils/context";
import ApiService from '../../../utils/apiService';

export default function DisplayInstitutions() {
  const [institutions, setInstitutions] = useState([]); 
  const [appState] = useContext(AppContext);

  useEffect(() => {
    ApiService.getInstitutionRelations(appState._id)
      .then(data => setInstitutions(data))
      .catch(err => console.log(err));
    
  }, [])

  return (
    <div>
      <h1>Display Institutions</h1>
      <table>
        <tbody>
          <tr>
            <th>Institution Name</th>
            <th>Verification</th>
            <th>VC</th>
          </tr>
          {institutions.map(institution => (
            <tr key={institution.institutionID}>
              <th>{institution.name}</th>
              <th>{institution.isVerified?"Verified":"Pending"}</th>
              <th>{institution.vc_url}</th>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}
