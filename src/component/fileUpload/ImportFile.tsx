'use client';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import useFetchData from '@/utils/useFetchData/customFetchData';
import CommonForm from '@/app/layout/commonForm/commonForm';

interface ImportFileProps {
  importUrl: string;
  fetchUrl: string;
}

const ImportFile: React.FC<ImportFileProps> = ({ importUrl, fetchUrl }) => {
  const modals = useSelector((state: any) => state.modals);
  const [form] = Form.useForm();
  const { importFile } = useFetchData();
  const [importFileData, setImportFileData] = useState<File | undefined>(
    undefined
  );
  const [fileList, setFileList] = useState([]);

  const onFinish = async () => {
    if (!importFileData) return;
    const formData = new FormData();
    formData.append('file', importFileData);
    const modelClose = true;
    await importFile(formData, importUrl, fetchUrl);
    setFileList([]);
  };

  const UploadProps = {
    onChange(info: UploadChangeParam<UploadFile<File>>) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        setImportFileData(info.file.originFileObj);
      } else if (info.file.status === 'error') {
        // Handle error
      }
      setFileList(info.fileList); // Update the fileList state
    },
    fileList,
    maxCount: 1,
  };

  return (
    <CommonForm
      open={modals.import}
      mdlTitle="Import File"
      btnSubmit="Save"
      form={form}
      onFinish={onFinish}
      closeName="import"
      setFileList={setFileList}
      body={
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Upload {...UploadProps}>
            <Button icon={<UploadOutlined />} className="uploads-items">
              Click to Upload
            </Button>
          </Upload>
        </div>
      }
    />
  );
};

export default ImportFile;
