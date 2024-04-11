import { useEffect, useState } from 'react';
import Nav from '../common/nav';
import SampleImage from '../../assets/images/about1.png';
import '../../assets/styles/detect-disease.css';
import { Footer } from '../misc/Footer';

import { Upload, message, Button, FloatButton, Form } from 'antd'; // Import Upload and message from Ant Design
import { CloseOutlined, InboxOutlined } from '@ant-design/icons';
import api from '../../api';

const { Dragger } = Upload;

const DetectDisease = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null)

  const handleImageUpload = (info) => {
    const file = info.file.originFileObj; // Get the file object
    const reader = new FileReader();

    setImageData(file);

    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleChangeImage = () => {
    // Clear the uploaded image state to allow selecting a new image
    setUploadedImage(null);
    setImageData(null);
    setPredictedImage(null);
  };

  const predict_lesions = async () => {
    setPredictedImage(null);
    console.log(typeof imageData);
    const formData = new FormData();
    formData.append('image', imageData);
    formData.append('lesion_type', 'hx');
    try {
      const response = await api.post("/api/predict-lesion/", formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        let predicted_image_url = response?.data?.predicted_image_url;
        setPredictedImage(
          `${import.meta.env.VITE_API_URL}/${predicted_image_url}`
        );
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Nav />

      <div className="container-fluid detect-disease-wrapper">
        <div className="row">
          <h1 className='lead detect-disease-heading'>Retinal Lesions Segmentation</h1>
        </div>
        <div className="row">
          {/* <Form> */}
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
                {predictedImage && <img id='right-image' src={predictedImage} alt="predicted image" />}
              </div>
              {uploadedImage && (
                <Button size='large' className="predict-image-btn" onClick={predict_lesions}>Predict Lesions</Button>
              )}
            </div>
          {/* </Form> */}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DetectDisease;