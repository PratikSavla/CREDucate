import React, { useContext, useEffect, useState } from 'react'
import AddNewInstitution from '../../../components/user/student/AddNewInstitution'
import DisplayInstitutions from '../../../components/user/student/DisplayInstitutions'
import { AppContext } from '../../../utils/context'
import DisplayMessages from '../../../components/user/student/DisplayMessages';
import DisplayCredentials from '../../../components/user/student/DisplayCredentials';

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
    <div>
      <h1>Student Home</h1>
      <h2>{appState.name} - {appState._id}</h2>
      <p><strong>Address:</strong> {appState.address}</p>
      <p><strong>Contact:</strong> {appState.contact}</p>
      { !requestToken && < DisplayMessages />}
      < DisplayCredentials requestToken={requestToken} />
      { !requestToken && < AddNewInstitution />}
      { !requestToken && < DisplayInstitutions/>}
    </div>
  )
}
