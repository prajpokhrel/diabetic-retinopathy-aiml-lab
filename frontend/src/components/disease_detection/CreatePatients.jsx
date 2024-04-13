import CreatePatientForm from "../auth/CreatePatientForm";
import { Footer } from "../misc/Footer";
import Nav from "../common/nav";
import '../../assets/styles/form-common.css';

function CreatePatients() {
  return (
    <>
      <Nav />
      
      <div className='container-fluid wrapper'>
        <div className='row mt-5'>
            <div className="col-sm-6 form-wrapper bg-red">
              <h1 className="lead title-text text-center">Add Patient</h1>
              <CreatePatientForm route='some/route' method='add' />
            </div>
          </div>
          <Footer />
      </div>
    </>
  )
}

export default CreatePatients;
