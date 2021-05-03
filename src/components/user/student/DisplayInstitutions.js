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
          <li className="collection-header" style={{backgroundColor: "#004e86", color: "white"}}><h4>Applied to institutions</h4></li>
            { unverifiedInstitutions.length<1 && <li className="collection-item" style={{backgroundColor: "#d6eeff"}}>No institutions with pending verification</li> }
            {unverifiedInstitutions.map(institution => (
              <li className="collection-item" style={{backgroundColor: "#d6eeff"}} key={institution.institutionID}>{institution.name}</li>
            ))}
        </ul>
      </div>
      <div>
        <ul className="collection with-header">
          <li className="collection-header" style={{backgroundColor: "#004e86", color: "white"}}><h4>Accepted by institutions</h4></li>
            { verifiedInstitutions.length<1 && 
              <li className="collection-item" style={{backgroundColor: "#d6eeff"}}>Apply to a institution or ask institution to verify you</li> 
            }
            {verifiedInstitutions.map(institution => (
              <li className="collection-item"style={{backgroundColor: "#d6eeff"}} key={institution.institutionID}>
                {institution.name} has {institution.claims.length>0?"assigned you a crededntial!":"has not assigned you a VC yet"}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
