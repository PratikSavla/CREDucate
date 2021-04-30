import React, { useEffect, useState } from 'react'
import {useHistory, useParams} from 'react-router-dom';
import ApiService from '../../../utils/apiService';
import { Helmet } from 'react-helmet-async';

export default function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [claims, setClaims] = useState([]);
  const history = useHistory();
  useEffect(() => {
    let isActive = true;
    try {
      ApiService.getRelationById(id)
        .then(res => {
          ApiService.getStudentById(res.studentID)
            .then(data => {
              if(isActive)setStudent(data);
            })
          ApiService.getClaims(res.claims)
            .then(data => {
              if(isActive)setClaims(data);
            })
          })
      } catch (error) {
        window.alert(error)
        history.push('/');
      }
    return () => {isActive=false;};
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const handleShare = async (credentialID) => {
    const {sharingUrl} = await ApiService.shareStoredVC(credentialID);
    navigator.clipboard.writeText(sharingUrl);
    window.alert("Credential Share URL Copid To Clipoard")
  }
  const handleDelete = async (credentialID) => {
    const remainingClaims = claims.map(claim => claim.id).filter(claim => claim !== credentialID);
    await ApiService.deleteClaimFromRelation(id, remainingClaims);
    
    setClaims(claims.filter(claim => claim.id !==credentialID));
  }
  return (
    <div className="container">
      <Helmet>
        <title>Student Detail</title>
      </Helmet>
      { student && <> 
        <h2><strong>Student Name:</strong> {student.name}</h2>
        <h4><strong>Address:</strong> {student.address}</h4>
        <h4><strong>Contact:</strong> {student.contact}</h4>
      </>}
      <h2>Crededntials Issued:</h2>
      <table className="highlight responsive-table centered">
        <thead>
        <tr>
            <th>Category</th>
            <th>Education Level</th>
            <th>Certificate</th>
            <th>Date Issued</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          { claims.map((claim) => {
            return (
            <tr key={claim.id}>
              <td>{claim.credentialSubject.data.hasCredential.credentialCategory}</td>
              <td>{claim.credentialSubject.data.hasCredential.educationalLevel}</td>
              <td>{claim.credentialSubject.data.hasCredential.url}</td>
              <td>{claim.credentialSubject.data.hasCredential.dateCreated}</td>
              <td>
                <button className="btn waves-effect waves-light indigo" onClick={() => handleShare(claim.id)}>Share</button>
                <button className="btn waves-effect waves-light red" onClick={() => handleDelete(claim.id)}>Delete</button>
                </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
}
