import React, { useContext, useState, useEffect } from 'react'
import ApiService from '../../../utils/apiService';
import {AppContext} from "../../../utils/context";
import {useHistory} from 'react-router-dom';
import axios from 'axios';

export default function DisplayStudents() {

  const [appState] = useContext(AppContext);
  const [verifiedStudents, setVerifiedStudents] = useState([]);
  const [unverifiedStudents, setUnerifiedStudents] = useState([]);

  const history = useHistory();
  useEffect(() => {
    const signal = axios.CancelToken.source();
    ApiService.getVerifiedInstitutionRelations(appState._id,signal)
      .then(data => setVerifiedStudents(data))
      .catch(err => console.log(err));
    ApiService.getUnverifiedInstitutionRelations(appState._id,signal)
      .then(data => setUnerifiedStudents(data))
      .catch(err => console.log(err));
    return () => signal.cancel("axios request cancelled");
  }, [appState])
  const handleShare = async (credentialID) => {
    const {sharingUrl} = await ApiService.shareStoredVC(credentialID);
    navigator.clipboard.writeText(sharingUrl);
    window.alert("Credential Share URL Copid To Clipoard")
  }
  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header"><h4>Unverified Students</h4></li>
        {
          unverifiedStudents.map(student => (
            <li className="collection-item" key={student._id}>
              <div className="" style={{height:"40px"}}>
              {student.name}
              <button className="secondary-content btn waves-effect waves-light indigo" onClick={() => history.push(`verify/${student._id}`)}>Verify</button>
              </div>
            </li>
          ))
        }
      </ul>

      <div>
        <ul className="collection with-header"> 
        <li className="collection-header"><h4>Verified Students</h4></li>        
          {
            verifiedStudents.map(student => (
              <li className="collection-item" key={student._id}>
                <div style={{height:"40px"}}>
                  {student.name}
                  {student.vc_url===''? <button className="secondary-content btn waves-effect waves-light indigo" 
                      onClick={() => history.push(`issue-credential/${student._id}`)}>Create Crededntial</button>
                    :<button className="secondary-content btn waves-effect waves-light indigo" 
                    onClick={() => handleShare(student.vc_url)}>Share Credential</button>}
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
