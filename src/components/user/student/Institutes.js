import React from 'react'
import AddNewInstitution from './AddNewInstitution'
import DisplayInstitutions from './DisplayInstitutions'

export default function Institutes() {
  return (
    <div className="container">
      <h2>Institutions</h2>
      < AddNewInstitution />
      < DisplayInstitutions/>
    </div>
  )
}
