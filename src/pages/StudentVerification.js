import React, { useEffect, useState } from 'react'
import {useHistory,useParams} from 'react-router-dom';
import ApiService from '../utils/apiService';

export default function StudentVerification() {

  const [relation, setRelation] = useState(null);
  const [student, setStudent] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  
  useEffect(() => {
    ApiService.getRelationById(id)
      .then(data => {
        setRelation(data);
        if(data.isVerified) return history.push('/');

        ApiService.getStudentById(data.studentID)
          .then(data => setStudent(data))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const verifyStudent = async () => {
    console.log(await ApiService.verifyStudent(relation._id));
    history.push()
  }

  return (
    <div>
      Student Verification
      {
        student && <>
          <h2>Name: {student.name}</h2>
          <h2>ID: {student._id}</h2>
          <h2>Contact: {student.contact}</h2>
          <h2>Address: {student.address}</h2>
          <button onClick={verifyStudent}>Verify Student</button>
        </>
      }
    </div>
  )
}
