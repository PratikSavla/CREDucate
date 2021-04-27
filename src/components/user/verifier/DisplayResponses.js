import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../utils/context';
import { MessageService } from '../../../utils/messageService';
import SdkService from '../../../utils/sdkService';
import { useHistory } from "react-router";
import ApiService from '../../../utils/apiService';

export default function DisplayResponses() {
  const [appState] = useContext(AppContext);
  const [messageList, setMessageList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let isActive = true;
    ApiService.getMessages(appState.accessToken)
      .then(response => {if(isActive)setMessageList(response)});
    window.setInterval(async () => {
      const response = await ApiService.getMessages(appState.accessToken);
      if(isActive)setMessageList(response)
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
      <table>
        <tbody>
          <tr>
            <th>From Did</th>
            <th>Date </th>
            <th>Action</th>
          </tr>
          { messageList.map((data) => {
            return (
            <tr key={data.id}>
              <th>{data.fromDid}</th>
              <th>{data.createdAt}</th>
              <th>
                <button onClick={() => history.push(`verify/${data.message}`)}>Verify</button>
                <button onClick={() => handleDeleteResponse(data.id)}>Delete Response</button>
              </th>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
}
