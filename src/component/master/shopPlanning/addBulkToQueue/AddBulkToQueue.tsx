'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Radio } from 'antd';
import { SubmitHandler } from 'react-hook-form';

import CommonForm from '@/app/layout/commonForm/commonForm';

const AddBulkToQueue = () => {
  const modals = useSelector((state: any) => state.modals);
  const [form] = Form.useForm();
  const onFinish: SubmitHandler<FormData> = async (data: any) => {};
  return (
    <CommonForm
      open={modals.addBulkToQueue}
      mdlTitle="Add Bulk To Queue"
      btnSubmit="Save"
      form={form}
      onFinish={onFinish}
      closeName="addBulkToQueue"
      body={
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Form.Item label="Status" name="status" className="form-item">
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>Machine Shop</Radio>
              <Radio value={2}>R & D Tool Room</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      }
    />
  );
};

export default AddBulkToQueue;
