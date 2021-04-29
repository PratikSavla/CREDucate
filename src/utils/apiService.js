import { endpoints } from "../constants/endpoints";
import LOCAL_STORAGE_KEY from "../constants/localstorage";
import { cloudWalletApi, issuerApi, verifierApi, messagerApi } from "./api";
import axios from 'axios';
import SdkService from "./sdkService";
import { MessageService } from "./messageService";

const MONGODB_URL = process.env.REACT_APP_SERVER_URL

export default class ApiService {
  
  // method for creating a new user account
  static async signUpInstitution(institution) {
    const { username, password } = institution;
    const { data } =  await cloudWalletApi.post(endpoints.SIGNUP, { username, password });

    const mongoInstitution = await axios.post(`${MONGODB_URL}/institutions`, {...institution, did: data.did, username})

    return { ...data, ...mongoInstitution.data};
  }

  // Method for logging in existing user into the network.
  static async logInInstitution(username, password) {
    const loginParams = { username, password }
    const a =  await cloudWalletApi.post(endpoints.LOGIN, loginParams)

    const mongoInstitution = await axios.get(`${MONGODB_URL}/institutions/did/${a.data.did}`)
    return {...a.data, ...mongoInstitution.data};
  }

   // method for creating a new user account
   static async signUpVerifier(verifier) {
    const { username, password } = verifier;
    const { data } =  await cloudWalletApi.post(endpoints.SIGNUP, { username, password });

    const mongoVerifier = await axios.post(`${MONGODB_URL}/verifiers`, {...verifier, did: data.did, username})

    return { ...data, ...mongoVerifier.data};
  }

  // Method for logging in existing user into the network.
  static async logInVerifier(username, password) {
    const loginParams = { username, password }
    const a =  await cloudWalletApi.post(endpoints.LOGIN, loginParams)

    const mongoVerifier = await axios.get(`${MONGODB_URL}/verifiers/did/${a.data.did}`)
    return {...a.data, ...mongoVerifier.data};
  }

  // method for creating a new user account
  static async signUpStudent(institution) {
    const { username, password } = institution;
    const { data } =  await cloudWalletApi.post(endpoints.SIGNUP, { username, password });

    const mongoInstitution = await axios.post(`${MONGODB_URL}/students`, {...institution, did: data.did, username})

    return { ...data, ...mongoInstitution.data};
  }

  // Method for logging in existing user into the network.
  static async logInStudent(username, password) {
    const loginParams = { username, password }
    const a =  await cloudWalletApi.post(endpoints.LOGIN, loginParams)

    const mongoStudent = await axios.get(`${MONGODB_URL}/students/did/${a.data.did}`)
    return {...a.data, ...mongoStudent.data};
  }


  /**
   * Shortcut method for storing access and DID tokens into localstorage,
   * and setting authorization bearer on our axios API instance(s).
   * */
  static clientSideLogIn(accessToken, did, user) {
    ApiService.storeAccessAndDidTokens(accessToken, did, user)
    ApiService.setAuthorizationBearer(accessToken);
  }

  // Method for logging user on both backend and client side.
  static async logout() {
    await cloudWalletApi.post(endpoints.LOGOUT)

    ApiService.removeAccessAndDidTokens()
  }

  // Method for issuing an unsigned VC.
  static async issueUnsignedVC(unsignedVC) {
    const {data} = await issuerApi.post(endpoints.VC_BUILD_UNSIGNED, unsignedVC);

    return data;
  }

  // Method for signing a VC.
  static async signVC(input) {
    const {data} = await cloudWalletApi.post(endpoints.WALLET_SIGN_CREDENTIALS, input);

    return data;
  }

  // Method for verifying multiple VCs.
  static async verifyVC(input) {
    const {data} = await verifierApi.post(endpoints.VERIFIER_VERIFY_VCS, input)

    return data;
  } 

  // Method for storing signed VCs.
  static async storeSignedVCs(verifiedCredential) {
    const response = await cloudWalletApi.post(endpoints.WALLET_CREDENTIALS, {"data":[verifiedCredential]})

    return response.data;
  }

  // Share stored VC
  static async shareStoredVC(VCId, ttl='0') {
    const {data} = await cloudWalletApi.post(`${endpoints.WALLET_CREDENTIALS}/${VCId}/share`, {"ttl":ttl})

    return data;
  }
  // Method for retrieving saved VCs.
  static async getSavedVCs(signal) {
    const {data} = await cloudWalletApi.get(endpoints.WALLET_CREDENTIALS, {cancelToken: signal.token,})

    return data;
  }

  // Method for deleting VC
  static async deleteStoredVC(VCId) {
    await cloudWalletApi.delete(`${endpoints.WALLET_CREDENTIALS}/${VCId}`)
  }

  /**
   * Shortcut method for storing access and DID tokens into localstorage.
   * */
   static storeAccessAndDidTokens(accessToken, did, user) {
    ApiService.saveAccessTokenToLocalStorage(accessToken);
    ApiService.saveDidTokenToLocalStorage(did);
    ApiService.saveUserToLocalStorage(user);
  }

  /**
   * Shortcut method for removing access and DID tokens from localstorage.
   * */
  static removeAccessAndDidTokens() {
    ApiService.removeAccessTokenFromLocalStorage()
    ApiService.removeDidTokenFromLocalStorage()
    ApiService.removeUserFromLocalStorage()
  }

  static setAuthorizationBearer = (accessToken) => {
    cloudWalletApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    messagerApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  /**
   * Method for storing access token into localstorage.
   * */
   static saveAccessTokenToLocalStorage(accessToken) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken)
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Method for retrieving access token from localstorage.
   * */
  static getAccessTokenFromLocalStorage() {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Method for removing access token from localstorage.
   * */
   static removeAccessTokenFromLocalStorage() {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Method for storing DID token into localstorage.
   * */
  static saveDidTokenToLocalStorage(did) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.DID_TOKEN, did)
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Method for retrieving DID token from localstorage.
   * */
   static getDidTokenToLocalStorage() {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY.DID_TOKEN)
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Method for removing DID token from localstorage.
   * */
  static removeDidTokenFromLocalStorage() {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY.DID_TOKEN)
    } catch (err) {
      console.error(err)
    }
  }

    /**
   * Method for storing User into localstorage.
   * */
     static saveUserToLocalStorage(user) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY.USER_TOKEN, user)
      } catch (err) {
        console.error(err)
      }
    }
  
    /**
     * Method for retrieving User from localstorage.
     * */
     static getUserToLocalStorage() {
      try {
        return localStorage.getItem(LOCAL_STORAGE_KEY.USER_TOKEN)
      } catch (err) {
        console.error(err)
      }
    }
  
    /**
     * Method for removing User from localstorage.
     * */
    static removeUserFromLocalStorage() {
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY.USER_TOKEN)
      } catch (err) {
        console.error(err)
      }
    }

  /**
   * Method for showing the user a generic message when a request fails or an error has been thrown.
   * */
   static alertWithBrowserConsole(consoleMessage = null, alertMessage="alertMessage") {
    if( consoleMessage ) {
      console.log(consoleMessage);
    }

    alert(alertMessage || 'There has been an issue processing your request. Please check the browser console.')
  }

  // add student to the relation table
  static async addStudentToInstitution(ids) {
    const { institutionID, studentID } = ids;
    
    const relation = await axios.post(`${MONGODB_URL}/relations/add/${institutionID}`, {'studentID':studentID});
    
    return relation.data;
  }

  // verify student relation
  static async verifyStudent(relationID) {

    const relation = await axios.put(`${MONGODB_URL}/relations/verify/${relationID}`);
    
    return relation.data;
  }

  // add url to the relation table
  static async addURLToRelation(relationID, vc_url) {
    
    const relation = await axios.put(`${MONGODB_URL}/relations/VC/${relationID}`, {'vc_url':vc_url});
    
    return relation.data;
  }

  // get verified students of a institution
  static async getVerifiedStudentRelations(institutionID,signal, params={}) {
    
    const { data } = await axios.get(`${MONGODB_URL}/relations/verified-institutions/${institutionID}`, {cancelToken: signal.token,params:params});
    let students = []
    for(let i=0;i<data.length; i++){
      const temp = await this.getInstitutionById(data[i].institutionID);
      students.push({...temp,...data[i]});
    }
    return students;
  }
  // get verified institutions of a student
  static async getVerifiedInstitutionRelations(studentID, signal, params={}) {
    
    const { data } = await axios.get(`${MONGODB_URL}/relations/verified-students/${studentID}`, {cancelToken: signal.token, params:params});
    let institutions = []
    for(let i=0;i<data.length; i++){
      const temp = await this.getStudentById(data[i].studentID);
      institutions.push({...temp,...data[i]});
    }
    return institutions;
  }
  // get unverified students of a institution
  static async getUnverifiedStudentRelations(institutionID,signal, params={}) {
    
    const { data } = await axios.get(`${MONGODB_URL}/relations/unverified-institutions/${institutionID}`, {cancelToken: signal.token,params:params});
    let students = []
    for(let i=0;i<data.length; i++){
      const temp = await this.getInstitutionById(data[i].institutionID);
      students.push({...temp,...data[i]});
    }
    return students;
  }
  // get unverified institutions of a student
  static async getUnverifiedInstitutionRelations(studentID, signal, params={}) {
    
    const { data } = await axios.get(`${MONGODB_URL}/relations/unverified-students/${studentID}`, {cancelToken: signal.token, params:params});
    let institutions = []
    for(let i=0;i<data.length; i++){
      const temp = await this.getStudentById(data[i].studentID);
      institutions.push({...temp,...data[i]});
    }
    return institutions;
  }

  // get student from username
  static async getStudentFromUsername(username) {

    const {data} = await axios.get(`${MONGODB_URL}/students/detailsFromUsername/${username}`);

    return data;
  }

  // get all institutions
  static async getAllInstitutions(signal) {
    const { data } = await axios.get(`${MONGODB_URL}/institutions`,{cancelToken: signal.token,});
    return data
  }

  // get institution by id
  static async getInstitutionById(id) {
    const { data } = await axios.get(`${MONGODB_URL}/institutions/id/${id}`);
    return data
  }
  // get student by id
  static async getStudentById(id) {
    const { data } = await axios.get(`${MONGODB_URL}/students/id/${id}`);
    return data
  }

  // get relation by id
  static async getRelationById(id) {
    const { data } = await axios.get(`${MONGODB_URL}/relations/byid/${id}`);
    return data
  }

  // get data for vc from relation id
  static async getDataForVC(relationID) {
    const relation = await this.getRelationById(relationID);
    const student = await this.getStudentById(relation.studentID);
    return {
      name:student.name, 
      did:student.did,
      id:student._id, 
      address:student.address, 
      contact:student.contact
    };
  }
  // get institutions for dropdown tab
  static async getInstitutionsForSelection(studentID,signal) {
    const allInstitutions = await this.getAllInstitutions(signal);
    const {data:relationInstitutions} = await axios.get(`${MONGODB_URL}/relations/institution/${studentID}`, {'signal':signal})
    const usedInstitutionIds = relationInstitutions.map(value => (value.institutionID));
    return allInstitutions.filter(institution => !usedInstitutionIds.includes(institution._id))
  }
  // get messages using all the apis
  static async getMessages(accessToken) {
    const sdkService = await SdkService.fromAccessToken(accessToken)
    const messageService = new MessageService(sdkService);
    const response = await messageService.getAll();
    return response;
  }
}