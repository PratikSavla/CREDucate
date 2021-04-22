import React, { useContext, useEffect, useState } from 'react'
import {useHistory,useParams} from 'react-router-dom';
import ApiService from '../utils/apiService';
import { AppContext } from '../utils/context';
import { generateVC } from '../utils/vc-template';

export default function IssueCredential() {

  const [formData, setFormData] = useState({studentName:'', 
    credentialCategory:'', 
    educationalLevel:'', 
    institutionName:'', 
    dateCreated:'',
    studentdid:'',
    expiresAt:'',
    url:''});
  const [student, setStudent] = useState(null);
  const [appState] = useContext(AppContext);
  const { id } = useParams();
  const history = useHistory();
  
  useEffect(() => {
    ApiService.getDataForVC(id)
      .then(data => {
        setStudent(data);
      }).catch(err => console.log(err));
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(!student) return
    const datetime = new Date()
    setFormData({
      ...formData, 
      institutionName:appState.name, 
      dateCreated:datetime.toISOString().slice(0,10),
      studentdid: student.did,
      studentName: student.name,
    });
  },[student]);// eslint-disable-line react-hooks/exhaustive-deps

  const createVC = async (e) => {
    e.preventDefault();
    const generatedVC = generateVC(formData)
    const {unsignedVC} = await ApiService.issueUnsignedVC(generatedVC);
    const {signedCredential} = await ApiService.signVC({'unsignedCredential':unsignedVC});
    const {credentialIds} = await ApiService.storeSignedVCs({'data':[signedCredential]});
    const {sharingUrl} = await ApiService.shareStoredVC(credentialIds[0]);
    const relation = await ApiService.addURLToRelation(id, sharingUrl);
    console.log(relation);
    history.push('/')
  }

  return (
    <div>
      <h1>Create New VC</h1>
      {
        student && <>
          <h2>Name: {student.name}</h2>
          <p><strong>Student ID:</strong> {student._id}</p>
          <p><strong>Contact:</strong> {student.contact}</p>
          <p><strong>Address:</strong> {student.address}</p>
          <form onSubmit={createVC}>
            <label><b>Credential Category</b></label>
            <input type="text" value={formData.credentialCategory} 
              onChange={e => setFormData({...formData, credentialCategory:e.target.value})} 
            /><br/>
            <label><b>Educational Level</b></label>
            <input type="text" value={formData.educationalLevel} 
              onChange={e => setFormData({...formData, educationalLevel:e.target.value})} 
            /><br/>
            <label><b>Expiry Date</b></label>
            <input type="date" value={formData.expiresAt} 
              onChange={e => setFormData({...formData, expiresAt:e.target.value})} 
            /><br/>
            <label><b>Certificate URL</b></label>
            <input type="text" value={formData.url} 
              onChange={e => setFormData({...formData, url:e.target.value})} 
            /><br/>
            <button type="submit">Create VC</button>
          </form>
        </>
      }
    </div>
  )
}
