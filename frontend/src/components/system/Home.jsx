import { Outlet, Link } from 'react-router-dom';
import Nav from '../common/nav';
import dashboardImage from '../../assets/images/about1.png';
import { Footer } from '../misc/Footer';
import '../../App.css';

const Home = () => {
  return (
    <>
    <Nav />
      
      {/* main body */}
      <div className='container-fluid wrapper'>
        <div className='row'>
          <div className="col-sm-8 left-dashboard">
              <img src={dashboardImage} alt="dashboard-about" className='dashboard-image'/>
            </div>
            <div className="col-sm-4 right-dashboard">
              <span className='lead'>Caring for better life</span>
              <h1 className='dashboard-text'>Leading the way in medical excellence.</h1>
              <Link to={'dashboard'}>
                <button className='dashboard-btn'>
                  Diagnose Now
                </button>
              </Link>
            </div>
          </div>
          <Footer />
      </div>

      {/* <Link to={'contacts/1'}>Go To Link</Link> */}

      <Outlet />
    </>
  );
}

export default Home;
