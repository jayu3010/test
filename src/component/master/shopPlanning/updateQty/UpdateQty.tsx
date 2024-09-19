'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Radio, Switch } from 'antd';
import { SubmitHandler } from 'react-hook-form';

import CommonForm from '@/app/layout/commonForm/commonForm';
import InputBox from '@/component/input/Input';

const UpdateQty = () => {
  const modals = useSelector((state: any) => state.modals);
  const [form] = Form.useForm();
  const onFinish: SubmitHandler<FormData> = async (data: any) => {};
  return (
    <CommonForm
      open={modals.updateQtyPriority}
      mdlTitle="Update Qty./Priority"
      btnSubmit="Save"
      form={form}
      onFinish={onFinish}
      closeName="updateQtyPriority"
      body={
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Form.Item label="Import Type" name="status" className="form-item">
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>Update Priority</Radio>
              <Radio value={2}>Update Quantity</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      }
    />
  );
};

export default UpdateQty;
