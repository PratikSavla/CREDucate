import React, { useContext, useEffect, useState } from 'react'
import {useHistory,useParams} from 'react-router-dom';
import ApiService from '../utils/apiService';
import { AppContext } from '../utils/context';
import { MessageService } from '../utils/messageService';
import SdkService from '../utils/sdkService';
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
    const {credentialIds} = await ApiService.storeSignedVCs(signedCredential);
    const sdkService = await SdkService.fromAccessToken(appState.accessToken)
    const messageService = new MessageService(sdkService);
    const response = await messageService.send(student.did, signedCredential);
    console.log(response);
    const relation = await ApiService.addURLToRelation(id, credentialIds[0]);
    console.log(relation);
    history.push('/')
  }

  return (
    <div className="container">
      <h2>Create New VC</h2>
      {
        student && <>
          <h4>Name: {student.name}</h4>
          <p><strong>Student ID:</strong> {student.id}</p>
          <p><strong>Contact:</strong> {student.contact}</p>
          <p><strong>Address:</strong> {student.address}</p>
          <form onSubmit={createVC} className="row">
            
        <div className="input-field col s12">
            <input type="text" value={formData.credentialCategory} 
              onChange={e => setFormData({...formData, credentialCategory:e.target.value})}/>
            <label>Credential Category</label>

            </div>
            <div className="input-field col s12">
            <input type="text" value={formData.educationalLevel} 
              onChange={e => setFormData({...formData, educationalLevel:e.target.value})}/>
            <label>Educational Level</label>

            </div>            
        <div className="input-field col s12">
            <input type="text" value={formData.url} 
              onChange={e => setFormData({...formData, url:e.target.value})}/>
            <label>Certificate URL</label>

            </div>
        <div className="input-field col s12">
            <input type="date" value={formData.expiresAt} 
              onChange={e => setFormData({...formData, expiresAt:e.target.value})}/>
              
            </div>
        <div className="">
            <button className="btn waves-effect waves-light indigo" type="submit">Create VC</button>
            </div>
          </form>
        </>
      }
      
    </div>
  )
}
