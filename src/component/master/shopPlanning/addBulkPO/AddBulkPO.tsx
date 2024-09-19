import { Button, Form, Upload } from 'antd';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib';

import CommonForm from '@/app/layout/commonForm/commonForm';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

const AddBulkPO = () => {
  const modals = useSelector((state: any) => state.modals);
  const [form] = Form.useForm();
  const [bulkPoFile, setBulkPoFile] = useState<File | null>(null);

  const { getShopData }: any = useFetchData();

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    const formData: any = new FormData();
    formData.append('file', bulkPoFile);
    formData.append('isPlannedOrder', true);
    const modelClose = true;
    getShopData(formData, service?.API_URL?.productionOrder.import, modelClose);
  };
  const UploadProps: UploadProps = {
    name: 'file',
    onChange(info) {
      if (info.file.status === 'done') {
        setBulkPoFile(info.file.originFileObj);
      }
    },
  };
  return (
    <CommonForm
      open={modals.addBulkPO}
      mdlTitle="Add Bulk PO"
      btnSubmit="Save"
      form={form}
      onFinish={onFinish}
      closeName="addBulkPO"
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

export default AddBulkPO;
