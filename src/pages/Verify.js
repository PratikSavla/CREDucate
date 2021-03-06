// import useFetch from "../utils/useFetch";
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { AppContext } from '../utils/context';
import SdkService from '../utils/sdkService';
import M from 'materialize-css'

export default function Verify() {
  const [appState] = useContext(AppContext);
  const [credential, setCredential] = useState({
    isValid: false,
    credentialid: '',
    holderName: '',
    credentialCategory: '',
    educationLevel: '',
    issuanceDate: '',
    certificateURL: '',
    expirationDate: ''
  });
  const { id } = useParams();
  useEffect(() => {
    SdkService.fromAccessToken(appState.accessToken)
      .then(sdkService => {
        sdkService.verifyCredentialShareResponseToken(id)
          // .then(resp => console.log(resp));
          .then(resp => setCredential({
            isValid: resp.isValid,
            credentialid: resp.suppliedCredentials[0].id,
            holderName: resp.suppliedCredentials[0].credentialSubject.data.name,
            credentialCategory: resp.suppliedCredentials[0].credentialSubject.data.hasCredential.credentialCategory,
            educationLevel: resp.suppliedCredentials[0].credentialSubject.data.hasCredential.educationalLevel,
            issuanceDate: resp.suppliedCredentials[0].issuanceDate,
            certificateURL: resp.suppliedCredentials[0].credentialSubject.data.hasCredential.url,
            expirationDate: resp.suppliedCredentials[0].expirationDate
          })).catch(err => M.toast({html : err.message, displayLength : 1000, classes : 'red'}));
      })
  }, [appState.accessToken])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="container">
      <h4>{credential.credentialid} - {credential.isValid?'Is Valid':'Not Valid'}</h4>
      <p>Holder Name: {credential.holderName}</p>
      <p>{credential.credentialCategory} - {credential.educationLevel}</p>
      <p>Issuance Date: {credential.issuanceDate}</p>
      <p>Expiration Date: {credential.expirationDate}</p>
      <a href={credential.certificateURL}>Certificate Link</a>
    </div>
  )
}