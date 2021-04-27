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

  return (
    <div>
      <h1>Unverified Students</h1>
      <table>
        <tbody>
        <tr>
          <th>Student Name</th>
          <th>Verification</th>
        </tr>
        {
          unverifiedStudents.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.isVerified?"Verified":<button onClick={() => history.push(`verify/${student._id}`)}>Verify</button>}</td>
            </tr>
          ))
        }
        </tbody>
      </table>

      <div>
        <h1>Verified Students</h1>
        <table>
          <tbody>
          <tr>
            <th>Student Name</th>
            <th>VC URL</th>
          </tr>
          {
            verifiedStudents.map(student => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.vc_url===''? <button onClick={() => history.push(`issue-credential/${student._id}`)}>Create VC</button>:student.vc_url}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}
