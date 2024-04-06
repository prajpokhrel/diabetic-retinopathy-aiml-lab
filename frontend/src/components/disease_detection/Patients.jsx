import Nav from '../common/nav';
import '../../assets/styles/detect-disease.css';
import DR_Image from '../../assets/images/retina_pic.jpg'
import EYE_IMAGE from '../../assets/images/eye_vector.jpg'
import { Footer } from '../misc/Footer';
import { Button, Table, Flex } from 'antd';
import { Link } from 'react-router-dom';
import api from '../../api';
import { useState, useEffect } from 'react';

function Patients() {
  const [patientsData, setPatientsData] = useState([]);

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US")
  }

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    try {
      const response = await api.get("/api/patients/");
      if (response.status === 200) {
        setPatientsData(response.data);
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const deletePatients = async (id) => {
    try {
      const response = await api.delete(`/api/patient/delete/${id}/`);
      if (response.status === 204) {
        await getPatients();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      title: 'Checked On',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (data) => {
        return formattedDate(data);
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <>
        <Flex wrap="wrap" gap="small">
          <Button type="primary" size='large'>update</Button>
          <Button type="primary" onClick={() => deletePatients(data.id)} size='large' danger>delete</Button>
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
          <h1 className='lead text-center main-text'>Diabetic Retinopathy: Retinal Lesions Segmentation</h1>
          <div className="col-sm-4 left-col-wrapper">
            <img src={EYE_IMAGE} alt="de image" className='dr-image'/>
          </div>
          <div className="col-sm-8 right-col-wrapper"> 
            <h1 className='lead title-text'>
              {'Patients'}
            </h1>
            <div className='row patient-add-button'>
              <Link to={'/create-patient'}>
                <Button className='text-right' type="primary" size='large'>Add Patient</Button>
              </Link>
              
            </div>
            <Table columns={columns} dataSource={patientsData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Patients;
