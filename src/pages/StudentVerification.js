import React, { useEffect, useState } from 'react'
import {useHistory,useParams} from 'react-router-dom';
import ApiService from '../utils/apiService';

export default function StudentVerification() {

  const [relation, setRelation] = useState(null);
  const [student, setStudent] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  const [disableButton, setDisableButton] = useState(false);
  
  useEffect(() => {
    if(id) {
    ApiService.getRelationById(id)
      .then(data => {
        setRelation(data);
        if(data.isVerified) return history.push('/');

        ApiService.getStudentById(data.studentID)
          .then(data => setStudent(data))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const verifyStudent = async () => {
    setDisableButton(true)
    console.log(await ApiService.verifyStudent(relation._id));
    setDisableButton(false)
    history.push("/")
  }
  if(id===null) return history.push('/')
  return (
    <div className="container">
      <h2>Student Verification</h2>
      {
        student && <>
          <h4><strong>Name:</strong> {student.name}</h4>
          <h4><strong>ID:</strong> {student._id}</h4>
          <h4><strong>Contact:</strong> {student.contact}</h4>
          <h4><strong>Address:</strong> {student.address}</h4>
          <button className="btn waves-effect waves-light indigo"disabled={disableButton} onClick={verifyStudent}>Verify Student</button>
          <button className="btn waves-effect waves-light red">Remove Student</button>
        </>
      }
    </div>
  )
}
