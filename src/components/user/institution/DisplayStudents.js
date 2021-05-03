import React, { useContext, useState, useEffect } from 'react'
import ApiService from '../../../utils/apiService';
import {AppContext} from "../../../utils/context";
import {useHistory} from 'react-router-dom';
import axios from 'axios';

export default function DisplayStudents() {

  const [appState] = useContext(AppContext);
  const [verifiedStudents, setVerifiedStudents] = useState([]);
  const [unverifiedStudents, setUnerifiedStudents] = useState([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [nextPageButton, setNextPageButton] = useState(false);
  const [prevPageButton, setPrevPageButton] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const signal = axios.CancelToken.source();
    ApiService.getVerifiedInstitutionRelations(appState._id, signal, {limit, page})
      .then(data => {
        setVerifiedStudents(data);
        if(data.length < limit) setNextPageButton(false);
        else setNextPageButton(true);
        if(page>0) setPrevPageButton(true);
        else setPrevPageButton(false);
      })
      .catch(err => console.log(err));
    return () => signal.cancel("axios request cancelled");
  }, [page,limit])  // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    const signal = axios.CancelToken.source();
    ApiService.getUnverifiedInstitutionRelations(appState._id, signal)
      .then(data => setUnerifiedStudents(data))
      .catch(err => console.log(err));
    return () => signal.cancel("axios request cancelled");
  }, [appState])  // eslint-disable-next-line 

  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header"  style={{backgroundColor: "#004e86", color: "white", marginBottom : 0}}>
          <h4>Unverified Students</h4>
        </li>
        { unverifiedStudents.length===0 && <li  style={{backgroundColor: "#d6eeff"}} className="collection-item">No students to verify</li>}
        {
          unverifiedStudents.map(student => (
            <li className="collection-item" key={student._id}  style={{backgroundColor: "#d6eeff"}}>
              <div className="" style={{height:"40px"}}>
              {student.name}
              <button className="secondary-content btn waves-effect waves-light blue darken-4" onClick={() => history.push(`verify/${student._id}`)}>Verify</button>
              </div>
            </li>
          ))
        }
      </ul>

      <div>
        <ul className="collection with-header"> 
          <li className="collection-header row" style={{backgroundColor: "#004e86", color: "white", marginBottom : 0}}>
            <h4 className="col s12 m6" >Verified Students</h4>
            <div className="col s12 m3 offset-m3">
              <select className="browser-default" value={limit} onChange={e => setLimit(e.target.value)}>
                <option value="" disabled defaultValue>Choose limit to display</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </li>   
          { verifiedStudents.length===0 && <li  style={{backgroundColor: "#d6eeff"}} className="collection-item">No verified students</li>}     
          {
            verifiedStudents.map(student => (
              <li className="collection-item "  style={{backgroundColor: "#d6eeff"}} key={student._id}>
                <div className="row">
                  <div className="col s12 m6" >{student.name}</div>
                  <button className="col s12 m2 offset-m1  btn waves-effect waves-light blue accent-4" 
                    onClick={() => history.push(`issue-credential/${student._id}`)}>Create Credential</button>
                  <button className="col s12 m2 offset-m1 btn waves-effect waves-light blue accent-4"
                    onClick={() => history.push(`student-detail/${student._id}`)}>View Profile</button>
                </div>
              </li>
            ))
          }
        </ul>
        <button className="btn waves-effect waves-light  blue darken-4"  disabled={!prevPageButton}
          onClick={() => {setPage(page-1)}}>
          <div className="valign-wrapper">
            <i className="material-icons">arrow_back</i>Previous Students
          </div>
        </button>
        <button className="btn waves-effect waves-light  blue darken-4 right" disabled={!nextPageButton}
          onClick={() => {setPage(page+1)}}>
            <div className="valign-wrapper">
            Next Students<i className="material-icons">arrow_forward</i>
          </div>
          </button>
      </div>
    </div>
  )
}
