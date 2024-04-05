import FormWrapper from "./FormWrapper";
import { Footer } from "../misc/Footer";
import Nav from "../common/nav";
import '../../assets/styles/form-common.css';

function Login() {
  return (
    <>
      <Nav />
      
      {/* main body */}
      <div className='container-fluid wrapper'>
        <div className='row mt-5'>
            <div className="col-sm-4 form-wrapper bg-red">
              <h1 className="lead title-text text-center">Sign In</h1>
              <FormWrapper route="/api/token/" method="login" />
            </div>
          </div>
          <Footer />
      </div>


      
    </>
  )
}

export default Login;
