import { Avatar, Card, Row, Col, Button } from 'antd';
import Nav from '../common/nav';
import {RightCircleOutlined, CaretRightOutlined} from '@ant-design/icons'
import '../../assets/styles/detect-disease.css';
import DR_Avatar from '../../assets/images/avatar_de.png';
import DR_Image from '../../assets/images/retina_pic.jpg'
import { Footer } from '../misc/Footer';

const { Meta } = Card;

const DetectDiseaseDashboard = () => {

  const cardDetails = [
    {
      title: 'MICROANEURYSMS',
      description: 'Description 1',
    },
    {
      title: 'HEMORRHAGES',
      description: 'Description 2'
    },
    {
      title: 'SOFT EXUDATES',
      description: 'Description 3'
    },
    {
      title: 'HARD EXUDATES',
      description: 'Description 3'
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

            <img src={DR_Image} alt="de image" className='dr-image'/>
          </div>
          <div className="col-sm-8 right-col-wrapper">
            <h1 className='lead title-text'>
              {'Please choose the following options and start diagnosing,'}
            </h1>
            <Row gutter={16}>
              {
                cardDetails.map((item) => {
                  return (
                    <>
                      <Col span={12}>
                        <Card className='card-column' title={<> <Avatar size='large' src={DR_Avatar} /> {item?.title}</>} bordered={false}>
                          
                          <div className="row">
                            <Button icon={<RightCircleOutlined />} type='primary' size='large' ghost>Diagnose</Button>
                          </div>
                        </Card>
                      </Col>
                    </>
                  );
                })
              }
            </Row>
            
            <div className="row">
              <h1 className='lead text-center title-text-bottom'>{'"Bringing the future of Healthcare"'}</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default DetectDiseaseDashboard;