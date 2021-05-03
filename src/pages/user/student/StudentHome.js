import React, { useContext, useEffect, useState, lazy } from 'react'
import { AppContext } from '../../../utils/context'
import { Helmet } from 'react-helmet-async';

import DisplayCredentials from '../../../components/user/student/DisplayCredentials'

export default function StudentHome(props) {
  const [appState] = useContext(AppContext);
  const [requestToken, setRequestToken] = useState(null);

  useEffect(() => {
    const {search} = props.location
    // if(search.length>0 && search.split('=')[0]==="?share=") {
      setRequestToken(search.split('=')[1]); 
    // }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="container">
      <Helmet>
        <title>Student - Home</title>
      </Helmet>
      <h2>{appState.name}</h2>
      <p><strong>Address:</strong> {appState.address}</p>
      <p><strong>Contact:</strong> {appState.contact}</p>
      < DisplayCredentials requestToken={requestToken} />
    </div>
  )
}
