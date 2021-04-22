import React, { useContext } from 'react'
import AddNewInstitution from '../../../components/user/student/AddNewInstitution'
import DisplayInstitutions from '../../../components/user/student/DisplayInstitutions'
import { AppContext } from '../../../utils/context'

export default function StudentHome() {
  const [appState] = useContext(AppContext);
  return (
    <div>
      <h1>Student Home</h1>
      <h2>{appState.name} - {appState._id}</h2>
      <p><strong>Address:</strong> {appState.address}</p>
      <p><strong>Contact:</strong> {appState.contact}</p>
      <h3><strong>VCs Issued:</strong> {appState.VCIssued}</h3>
      < AddNewInstitution />
      < DisplayInstitutions/>
    </div>
  )
}
