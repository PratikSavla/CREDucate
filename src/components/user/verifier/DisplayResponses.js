import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../utils/context';
import { MessageService } from '../../../utils/messageService';
import SdkService from '../../../utils/sdkService';
import { useHistory } from "react-router";
import ApiService from '../../../utils/apiService';

export default function DisplayResponses({setNotificationNumber}) {
  const [appState] = useContext(AppContext);
  const [messageList, setMessageList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let isActive = true;
    ApiService.getMessages(appState.accessToken)
      .then(response => {if(isActive)setMessageList(response); setNotificationNumber(response.length)});
    window.setInterval(async () => {
      const response = await ApiService.getMessages(appState.accessToken);
      if(isActive)setMessageList(response);
      setNotificationNumber(response.length);
    }, 10000)
    return () => {isActive=false;};
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteResponse = async (id) => {
    const sdkService = await SdkService.fromAccessToken(appState.accessToken);
    const messageService = new MessageService(sdkService);
    const res = await messageService.delete(id);
    const response = await ApiService.getMessages(appState.accessToken);
    setMessageList(response);
    console.log(res);
  }
  return (
    <div>
      <h2>Display Responses</h2>
      <table className="highlight responsive-table centered">
        <thead>
        <tr>
            <th>From Did</th>
            <th>Date </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          { messageList.map((data) => {
            return (
            <tr key={data.id}>
              <td>{data.fromDid}</td>
              <td>{data.createdAt}</td>
              <td>
                <button className="btn waves-effect waves-light indigo modal-close" onClick={() => history.push(`verify/${data.message}`)}>Verify</button>
                <button className="btn waves-effect waves-light red" onClick={() => handleDeleteResponse(data.id)}>Delete Response</button>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
}
