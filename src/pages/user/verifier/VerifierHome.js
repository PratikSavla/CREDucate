import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../utils/context'
import SdkService from '../../../utils/sdkService';

export default function VerifierHome() {
  
  const [appState] = useContext(AppContext);
  const [requestTokenURL, setRequestTokenURL] = useState('');

  useEffect(() => {
    SdkService.fromAccessToken(appState.accessToken)
      .then( sdkService => sdkService.createCredentialShareRequestToken()
        .then(shareRequestTokenURL => setRequestTokenURL(`${process.env.REACT_APP_URL}/student?share=${shareRequestTokenURL}`))
      )
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="container">
      <h2>{appState.name}</h2>
      <a href={requestTokenURL}>Sharing URL</a>
      <p><strong>Address:</strong> {appState.address}</p>
      <p><strong>Contact:</strong> {appState.contact}</p>
    </div>
  )
}
