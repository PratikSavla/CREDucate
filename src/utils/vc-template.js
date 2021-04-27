export const generateVC = ({
  studentName, 
  credentialCategory, 
  educationalLevel, 
  institutionName, 
  dateCreated,
  studentdid,
  expiresAt,
  url}) => {
  const vc = {
    "type": "EducationCredentialPersonV1",
    "data": {
      "@type": [
        "Person",
        "PersonE",
        "EducationPerson"
      ],
      "name": studentName,
      "hasCredential": {
        "@type": "EducationalOcupationalCredential",
        "credentialCategory": credentialCategory,
        "educationalLevel": educationalLevel,
        "recognizedBy": {
          "@type": [
            "Organization",
            "OrganizationE"
          ],
          "name": institutionName
        },
        "dateCreated": dateCreated,
        "url": url
      }
    },
    "holderDid": studentdid,
    "expiresAt": expiresAt
  }
  return vc;
}