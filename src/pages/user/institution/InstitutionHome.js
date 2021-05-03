import React, { useContext, lazy } from 'react'
import { Helmet } from 'react-helmet-async';
import { AppContext } from '../../../utils/context'

const DisplayStudents = lazy(() => import('../../../components/user/institution/DisplayStudents'))

export default function InstitutionHome() {
  const [appState] = useContext(AppContext);
  return (
    <div className="container">
      <Helmet>
        <title>Institution - Home</title>
      </Helmet>
      <h2>{appState.name}</h2>
      <p><strong>Address:</strong> {appState.address}</p>
      <p><strong>Contact:</strong> {appState.contact}</p>
      < DisplayStudents />
    </div>
  )
}
