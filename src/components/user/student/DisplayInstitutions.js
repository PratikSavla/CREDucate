import React, { useContext, useState, useEffect } from 'react'
import {AppContext} from "../../../utils/context";
import ApiService from '../../../utils/apiService';
import axios from 'axios';

export default function DisplayInstitutions() {
  const [verifiedInstitutions, setVerifiedInstitutions] = useState([]);
  const [unverifiedInstitutions, setUnverifiedInstitutions] = useState([]);


  const [appState] = useContext(AppContext);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    ApiService.getVerifiedStudentRelations(appState._id, signal)
      .then(data => setVerifiedInstitutions(data))
      .catch(err => console.log(err));
    ApiService.getUnverifiedStudentRelations(appState._id, signal)
      .then(data => setUnverifiedInstitutions(data))
      .catch(err => console.log(err));
    return () => signal.cancel("axios request cancelled");
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div>
        <ul className="collection with-header">
          <li className="collection-header">Applied to institutions:</li>
            {unverifiedInstitutions.map(institution => (
              <li className="collection-item" key={institution.institutionID}>{institution.name}</li>
            ))}
        </ul>
      </div>
      <div>
        <h2>Verified by Institutions</h2>
        <table className="highlight responsive-table centered">
          <thead>
            <tr>
              <th>Institution Name</th>
              <th>VC</th>
            </tr>
          </thead>
          <tbody>
            
            {verifiedInstitutions.map(institution => (
              <tr key={institution.institutionID}>
                <td>{institution.name}</td>
                <td>{institution.vc_url===''?'No VC Assigned Yet':institution.vc_url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
