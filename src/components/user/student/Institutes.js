import React from 'react'
import { Helmet } from 'react-helmet-async';
import AddNewInstitution from './AddNewInstitution'
import DisplayInstitutions from './DisplayInstitutions'

export default function Institutes() {
  return (
    <div className="container">
      <Helmet>
        <title>Student - Institutions</title>
      </Helmet>
      <h2>Institutions</h2>
      < AddNewInstitution />
      < DisplayInstitutions/>
    </div>
  )
}
