import React, { useContext, useEffect, useState } from 'react'
import ApiService from '../../../utils/apiService';
import { AppContext } from '../../../utils/context';
import { MessageService } from '../../../utils/messageService';
import SdkService from '../../../utils/sdkService';

export default function DisplayMessages({setNotificationNumber}) {
  const [appState] = useContext(AppContext);
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    let isActive = true;
    ApiService.getMessages(appState.accessToken)
      .then(response => {
        if(isActive)setMessageList(response);
        setNotificationNumber(response.length);
      });
    window.setInterval(async () => {
      const response = await ApiService.getMessages(appState.accessToken);
      if(isActive)setMessageList(response)
      setNotificationNumber(response.length);
    }, 10000)
    return () => {isActive=false;};
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveVC = async (messageID, verifiedCredential) => {
    console.log(verifiedCredential);
    const credential = await ApiService.storeSignedVCs(verifiedCredential);
    console.log(credential);
    const sdkService = await SdkService.fromAccessToken(appState.accessToken);
    const messageService = await new MessageService(sdkService);
    const resp = await messageService.delete(messageID);
    console.log(resp)
  }
  if(messageList.length===0) return (
    <h2>No Messages</h2>
  )
  return (
    <div>
      <h2>Display messages</h2>
      <table className="highlight responsive-table centered">
        <thead>
        <tr>
            <th>Institution Name</th>
            <th>Category</th>
            <th>Education Level</th>
            <th>Certificate</th>
            <th>Date Created</th>
            <th>Save Credential</th>
          </tr>
        </thead>
        <tbody>
          
          { messageList.map((data) => {
            const {message} = data
            return (
            <tr key={message.id}>
              <td>{message.credentialSubject.data.hasCredential.recognizedBy.name}</td>
              <td>{message.credentialSubject.data.hasCredential.credentialCategory}</td>
              <td>{message.credentialSubject.data.hasCredential.educationalLevel}</td>
              <td>{message.credentialSubject.data.hasCredential.url}</td>
              <td>{message.credentialSubject.data.hasCredential.dateCreated}</td>
              <td><button className="btn waves-effect waves-light indigo" onClick={() => {handleSaveVC(data.id, message)}}>Save</button></td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
}
