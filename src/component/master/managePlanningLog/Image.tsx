import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/lib/upload/interface';
import Image from 'next/image';

type FileType = RcFile;

const FileUpload = ({ setImageUrl }: any) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImage] = useState('');

  //   type FileType = Parameters<UploadProps['beforeUpload']>[0];

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    getBase64(info.file.originFileObj as FileType, (url) => {
      setLoading(false);
      const firstFile = info.fileList[0];

      setImageUrl(firstFile);
      setImage(url);
    });
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default FileUpload;
