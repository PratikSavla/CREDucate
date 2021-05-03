import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ApiService from '../../../utils/apiService';
import { AppContext } from '../../../utils/context';
import { MessageService } from '../../../utils/messageService';
import SdkService from '../../../utils/sdkService';
import M from 'materialize-css'

export default function DisplayCredentials({requestToken}) {
  const [appState] = useContext(AppContext);
  const [credentials, setCredentials] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  // console.log(requestToken)
  useEffect(() => {
    let isActive = true;
    const signal = axios.CancelToken.source();
    ApiService.getSavedVCs(signal)
        .then(data => {if(isActive) setCredentials(data)});
    window.setInterval(() => {
      if(!isActive) return;
      ApiService.getSavedVCs(signal)
        .then(data => {if(isActive) setCredentials(data)});
    }, 10000);
    return () => {isActive=false;signal.cancel("axios request cancelled");};
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  const handleShareResponse = async (credential) => {
    setDisableButton(true)
    console.log(credential);
    const sdkService = await SdkService.fromAccessToken(appState.accessToken);
    const {payload} = sdkService.parseToken(requestToken);
    const responseToken = await sdkService.createCredentialShareResponseToken(requestToken, [credential]);
    const messageService = new MessageService(sdkService);
    const {id} = await messageService.send(payload.iss,responseToken);
    // const end = await messageService.delete(id) 
    console.log(id); 
    setDisableButton(false)
  };

  const handleShare = async (credentialID) => {
    const {sharingUrl} = await ApiService.shareStoredVC(credentialID);
    navigator.clipboard.writeText(sharingUrl);
    M.toast({html : "Credential Share URL Copid To Clipoard", displayLength : 1000})
  }
  return (
    <div>
      <h2>All Credentials</h2>
      <table className="highlight responsive-table centered">
        <thead >
        <tr>
            <th>Institution Name</th>
            <th>Category</th>
            <th>Education Level</th>
            <th>Certificate</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { credentials.map(credential => (
            <tr key={credential.id}>
              <td>{credential.credentialSubject.data.hasCredential.recognizedBy.name}</td>
              <td>{credential.credentialSubject.data.hasCredential.credentialCategory}</td>
              <td>{credential.credentialSubject.data.hasCredential.educationalLevel}</td>
              <td>{credential.credentialSubject.data.hasCredential.url}</td>
              <td>{credential.credentialSubject.data.hasCredential.dateCreated}</td>
              <td>
                { requestToken &&<button className="btn waves-effect waves-light  blue accent-4" disabled={disableButton} onClick={() => handleShareResponse(credential)}>Share</button>}
                { !requestToken &&<button className="btn waves-effect waves-light  blue accent-4" onClick={() => handleShare(credential.id)}>Share</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
