import { Helmet } from 'react-helmet-async';
import students_img from '../assets/img/students.jpg'
import schools_and_colleges_img from '../assets/img/schools and colleges.webp'
import companies_img from '../assets/img/companies.jpg'
import cred_flow_img from '../assets/img/cred-flow.png'
import M from 'materialize-css'

const Home = () => {
  M.AutoInit()
  return (
    <div>
      <Helmet>
        <title>CREDucate</title>
      </Helmet>
      <section className="container section scrollspy" id="photos"  style = {{ marginTop : 30}}>
    <div className="row">
      <div className="col s12 l4">
          <img src={students_img} alt="" className="responsive-img materialboxed"/>
      </div>
      <div className="col s12 l6 offset-l1">
        <h2 className="indigo-text text-darken-4">Students</h2>
        <p>Showcase your achievements and experience and share them with organizations with minimal keystrokes</p>
      </div>
    </div>
    <div className="row">
      <div className="col s12 l4 offset-l1 push-l7">
          <img src={schools_and_colleges_img} alt="" className="responsive-img materialboxed"/>
      </div>
      <div className="col s12 l6 offset-l1 pull-l5 right-align">
        <h2 className="indigo-text text-darken-4">Schools and Colleges</h2>
        <p>Issue certificates, marksheets along with other credentials and documents such as bonafides swiftly online with less paperwork</p>
      </div>
    </div>
    <div className="row">
      <div className="col s12 l4">
          <img src={companies_img} alt="" className="responsive-img materialboxed"/>
      </div>
      <div className="col s12 l6 offset-l1">
        <h2 className="indigo-text text-darken-4">Companies</h2>
        <p>Streamline the recuitment process by centralizing useful and credible information about potential candidates</p>
      </div>
    </div>
  </section>
<section className="container center-align">
<img src={cred_flow_img} alt = '' className ="responsive-img materialboxed "/>

</section>
  <div className = 'blue-grey darken-3' style = {{height : 120}}></div>
    </div> 
  );
}
 
export default Home;
