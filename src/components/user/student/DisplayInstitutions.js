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
          <li className="collection-header"><h4>Applied to institutions</h4></li>
            {unverifiedInstitutions.map(institution => (
              <li className="collection-item" key={institution.institutionID}>{institution.name}</li>
            ))}
        </ul>
      </div>
      <div>
        <h2>Verified by Institutions</h2>
        <ul className="collection with-header">
          <li className="collection-header"><h4>Accepted by institutions</h4></li>
            
            {verifiedInstitutions.map(institution => (
              <li className="collection-item" key={institution.institutionID}>
                {institution.name} has {institution.vc_url===''?'has not assigned VC yet':"assigned you a crededntial already"}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
