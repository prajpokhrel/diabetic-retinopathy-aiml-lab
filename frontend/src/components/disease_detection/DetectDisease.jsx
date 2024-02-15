import { useState } from 'react';
import Nav from '../common/nav';
import SampleImage from '../../assets/images/about1.png';
import '../../assets/styles/detect-disease.css';
import { Footer } from '../misc/Footer';

import { Upload, message, Button, FloatButton } from 'antd'; // Import Upload and message from Ant Design
import { CloseOutlined, InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export const DetectDisease = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (info) => {
    const file = info.file.originFileObj; // Get the file object
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleChangeImage = () => {
    // Clear the uploaded image state to allow selecting a new image
    setUploadedImage(null);
  };

  return (
    <>
      <Nav />

      <div className="container-fluid detect-disease-wrapper">
        <div className="row">
          <h1 className='lead detect-disease-heading'>Retinal Lesions Segmentation</h1>
        </div>
        <div className="row">
          <div className="col-lg-6 left-wrapper">
            <div className="left-circle">
            {uploadedImage ? (
                <img id='left-image' src={uploadedImage} alt="input image" />
              ) : (
                <div className="drag-drop-container">
                  <Dragger
                    className="drag-drop"
                    name="file"
                    multiple={false}
                    showUploadList={false}
                    customRequest={() => {}}
                    onChange={handleImageUpload}
                    accept="image/*"
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined className='drag-icon'/>
                    </p>
                    <p className="ant-upload-text">Click or drag image to this area to upload</p>
                  </Dragger>
                </div>
              )}

              {/* <img id='left-image' src={SampleImage} alt="input image" /> */}
            </div>
            {uploadedImage && (
              // <Button className="change-image-btn" onClick={handleChangeImage} icon={<CloseOutlined />} />
              <Button size='large' danger className="change-image-btn" onClick={handleChangeImage}>Reset</Button>
            )}
          </div>
          
          <div className="col-lg-6 right-wrapper">
            <div className="right-circle">
              <img id='right-image' src={SampleImage} alt="predicted image" />
            </div>
            {uploadedImage && (
              <Button size='large' className="predict-image-btn" onClick={handleChangeImage}>Predict Lesions</Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

