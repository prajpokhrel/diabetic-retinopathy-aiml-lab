import FormWrapper from "./FormWrapper";
import { Footer } from "../misc/Footer";
import Nav from "../common/nav";
import '../../assets/styles/form-common.css';

function Register() {
  return (
    <>
      <Nav />
      
      <div className='container-fluid wrapper'>
        <div className='row mt-5'>
            <div className="col-sm-4 form-wrapper bg-red">
              <h1 className="lead title-text text-center">Sign Up</h1>
              <FormWrapper route="/api/user/register/" method="register" />
            </div>
          </div>
          <Footer />
      </div>
    </>
  )
}

export default Register;
