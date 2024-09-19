import {  Modal } from 'antd';
import React from 'react';

interface ViewHMIProps {
  isModalVisible: any;
  setIsModalVisible: any;
  title:string,
  body:any
}

const ViewHMI: React.FC<ViewHMIProps> = ({
  isModalVisible,
  setIsModalVisible,
  title,
  body
}) => {
 

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

 
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className={`view-modal ${title=='HMI'? 'hmimodel':'received_model'}`}
    >
     {body}
    
    </Modal>
  );
};

export default ViewHMI;
