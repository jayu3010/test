import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Form, message, Upload } from 'antd';

const props: UploadProps = {
  name: 'drawingFile',
  // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  // headers: {
  //   authorization: 'authorization-text',
  // },
  onChange(info) {
    if (info?.file?.status !== 'uploading') {
      console.log(info?.file, info?.fileList);
    }
    if (info?.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      // setImageurl(info.file.originFileObj)
    } else if (info?.file?.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const FileUpload: React.FC = ({ setImageUrl }: any) => {
  const [fileList, setFileList] = useState<any[]>([]);

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      const { originFileObj } = info.file;
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList(info.fileList);
  };
  return (
    <Form.Item
      label="Part Drawing (PDF)"
      name="drawingFile"
      className="form-item"
    >
      <Upload
        fileList={fileList}
        onChange={handleUpload}
        beforeUpload={() => false} // Prevent automatic upload
      >
        <Button className="upload-item" icon={<UploadOutlined />}>
          Click to Upload
        </Button>
      </Upload>
    </Form.Item>
  );
};

export default FileUpload;
