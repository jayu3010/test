import { Button, Modal } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';

interface ZoomImageProps {
  isModalVisible: any;
  setIsModalVisible: any;
}

const ZoomImage: React.FC<ZoomImageProps> = ({
  isModalVisible,
  setIsModalVisible,
}) => {
  const [zoom, setZoom] = useState(1);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const zoomIn = () => {
    setZoom(zoom + 0.1);
  };

  const zoomOut = () => {
    setZoom(zoom > 0.1 ? zoom - 0.1 : 0.1);
  };

  const handleWheel = (event: any) => {
    event.preventDefault();
    if (event.deltaY < 0) {
      // Scrolling up
      setZoom((prevZoom) => Math.min(prevZoom + 0.1, 5));
    } else {
      // Scrolling down
      setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
    }
  };

  return (
    <Modal
      title="Zoom Image"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <div style={{ textAlign: 'center' }}>
        <Image
          onWheel={handleWheel}
          alt="example"
          style={{
            transform: `scale(${zoom})`,
            transition: 'transform 0.3s ease',
          }}
          src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button onClick={zoomIn} style={{ marginRight: '10px' }}>
          Zoom In
        </Button>
        <Button onClick={zoomOut}>Zoom Out</Button>
      </div>
    </Modal>
  );
};

export default ZoomImage;
