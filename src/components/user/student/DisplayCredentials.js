import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ApiService from '../../../utils/apiService';
import { AppContext } from '../../../utils/context';
import { MessageService } from '../../../utils/messageService';
import SdkService from '../../../utils/sdkService';

export default function DisplayCredentials({requestToken}) {
  const [appState] = useContext(AppContext);
  const [credentials, setCredentials] = useState([]);
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
  const handleShare = async (credential) => {
    console.log(credential);
    const sdkService = await SdkService.fromAccessToken(appState.accessToken);
    const {payload} = sdkService.parseToken(requestToken);
    const responseToken = await sdkService.createCredentialShareResponseToken(requestToken, [credential]);
    const messageService = new MessageService(sdkService);
    const {id} = await messageService.send(payload.iss,responseToken);
    // const end = await messageService.delete(id)
    console.log(id); 
  };
  return (
    <div>
      <h2>All Credentials</h2>
      <table>
        <tbody>
          <tr>
            <th>Institution Name</th>
            <th>Category</th>
            <th>Education Level</th>
            <th>Certificate</th>
            <th>Date Created</th>
            { requestToken && <th>Action</th>}
          </tr>
          { credentials.map(credential => (
            <tr key={credential.id}>
              <th>{credential.credentialSubject.data.hasCredential.recognizedBy.name}</th>
              <th>{credential.credentialSubject.data.hasCredential.credentialCategory}</th>
              <th>{credential.credentialSubject.data.hasCredential.educationalLevel}</th>
              <th>{credential.credentialSubject.data.hasCredential.url}</th>
              <th>{credential.credentialSubject.data.hasCredential.dateCreated}</th>
              { requestToken && <th><button onClick={() => handleShare(credential)}>Share</button></th>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}