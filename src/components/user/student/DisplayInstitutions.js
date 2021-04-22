import React, { useContext, useState, useEffect } from 'react'
import {AppContext} from "../../../utils/context";
import ApiService from '../../../utils/apiService';

export default function DisplayInstitutions() {
  const [verifiedInstitutions, setVerifiedInstitutions] = useState([]);
  const [unverifiedInstitutions, setUnverifiedInstitutions] = useState([]);


  const [appState] = useContext(AppContext);

  useEffect(() => {
    ApiService.getVerifiedStudentRelations(appState._id)
      .then(data => setVerifiedInstitutions(data))
      .catch(err => console.log(err));
    ApiService.getUnverifiedStudentRelations(appState._id)
      .then(data => setUnverifiedInstitutions(data))
      .catch(err => console.log(err));
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div>
        <h2>Not verified by Institutions</h2>
        <table>
          <tbody>
            <tr>
              <th>Institution Name</th>
              <th>Verification</th>
            </tr>
            {unverifiedInstitutions.map(institution => (
              <tr key={institution.institutionID}>
                <th>{institution.name}</th>
                <th>Pending</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Verified by Institutions</h2>
        <table>
          <tbody>
            <tr>
              <th>Institution Name</th>
              <th>VC</th>
            </tr>
            {verifiedInstitutions.map(institution => (
              <tr key={institution.institutionID}>
                <th>{institution.name}</th>
                <th>{institution.vc_url===''?'No VC Assigned Yet':institution.vc_url}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
