import Nav from '../common/nav';
import '../../assets/styles/detect-disease.css';
import DR_Image from '../../assets/images/retina_pic.jpg'
import EYE_IMAGE from '../../assets/images/eye_vector.jpg'
import { Footer } from '../misc/Footer';
import { Button, Table, Flex } from 'antd';

const DetectDiseaseDashboard = () => {

  const data = [
    {
      key: '1',
      first_name: 'Prajwal',
      last_name: 'Pokhrel',
      age: 32,
      passport_number: 123213,
      diagnosis: 'Have a severe diabetic retinopathy',
    },
    {
      key: '1',
      first_name: 'Prajwal',
      last_name: 'Pokhrel',
      age: 32,
      passport_number: 123213,
      diagnosis: 'Have a severe diabetic retinopathy',
    }
  ];

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Passport Number',
      dataIndex: 'passport_number',
      key: 'passport_number',
    },
    {
      title: 'Diagnosis',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <>
        <Flex wrap="wrap" gap="small">
          <Button type="primary" size='large'>update</Button>
          <Button type="primary" size='large' danger>delete</Button>
        </Flex>
        </>
      ),
    },
  ];

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row mt-2">
          {/* <h1 className='display-4 lead'>
            Welcome,
          </h1> */}
          <h1 className='lead text-center main-text'>Diabetic Retinopathy: Retinal Lesions Segmentation</h1>
          <div className="col-sm-4 left-col-wrapper">
            {/* <h1 className='lead title-text-bottom'>
              {'"Better vision for the better future"'}
            </h1> */}

            <img src={EYE_IMAGE} alt="de image" className='dr-image'/>
          </div>
          <div className="col-sm-8 right-col-wrapper">
            <h1 className='lead title-text'>
              {'Patients'}
            </h1>
            {/* Here goes the table */}
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetectDiseaseDashboard;