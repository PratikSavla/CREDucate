import React, { useContext, useState, useEffect } from 'react'
import ApiService from '../../../utils/apiService';
import {AppContext} from "../../../utils/context";

export default function DisplayStudents() {
  const [appState] = useContext(AppContext);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    ApiService.getStudentRelations(appState._id)
      .then(data => setStudents(data))
      .catch(err => console.log(err));
  }, [appState])

  const verifyStudent = async (relationID) => {
    console.log(await ApiService.verifyStudent(relationID));
  }
  return (
    <div>
      <h1>Students</h1>
      <table>
        <tbody>
        <tr>
          <th>Student Name</th>
          <th>Verification</th>
          <th>VC URL</th>
        </tr>
        {
          students.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.isVerified?"Verified":<button onClick={() => verifyStudent(student._id)}>Verify</button>}</td>
              <td>{student.vc_url===''? <button>Create VC</button>:student.vc_url}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}
