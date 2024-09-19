'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Radio, Switch } from 'antd';
import { SubmitHandler } from 'react-hook-form';

import CommonForm from '@/app/layout/commonForm/commonForm';
import InputBox from '@/component/input/Input';

const AddCellPlannedPO = () => {
  const modals = useSelector((state: any) => state.modals);
  const [form] = Form.useForm();
  const onFinish: SubmitHandler<FormData> = async (data: any) => {};
  return (
    <CommonForm
      open={modals.addCellPlannedPO}
      mdlTitle="Add Cell Planned P.O."
      btnSubmit="Save"
      form={form}
      onFinish={onFinish}
      closeName="addCellPlannedPO"
      body={
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <InputBox
            label="Order No."
            name="orderNumber"
            required
            inputPlaceholder="Order No."
            validateAsNumber={false}
            validateAsString={false}
          />
          <InputBox
            label="Priority"
            name="priority"
            required
            inputPlaceholder="Priority"
            validateAsNumber={false}
            validateAsString={false}
          />
          <InputBox
            label="Plan Type"
            name="planType"
            required
            inputPlaceholder="Plan Type"
            validateAsNumber={false}
            validateAsString={false}
          />
          <InputBox
            label="Cell Name"
            name="cellName"
            required
            inputPlaceholder="Cell Name"
            validateAsNumber={false}
            validateAsString={false}
          />
          <InputBox
            label="Part No."
            name="partNumber"
            required
            inputPlaceholder="Part No."
            validateAsNumber={false}
            validateAsString={false}
          />
          <InputBox
            label="Planned End Date Time"
            name="plannedEndDateTime"
            required
            inputPlaceholder="Planned End Date Time"
          />
          <InputBox
            label="Planned Start Date Time"
            name="plannedStartDateTime"
            required
            inputPlaceholder="Planned Start Date Time"
          />
          <InputBox
            label="Actual End Date Time"
            name="actualEndDateTime"
            required={false}
            inputPlaceholder="Actual End Date Time"
          />
          <InputBox
            label="Actual Start Date Time"
            name="actualStartDateTime"
            required={false}
            inputPlaceholder="Actual Start Date Time"
          />
          <InputBox
            label="Qty."
            name="quantity"
            required
            inputPlaceholder="Quantity"
            validateAsNumber
          />
          <InputBox
            label="Finished Qty."
            name="finishedQuantity"
            required={false}
            inputPlaceholder="Finished Qty."
            validateAsNumber
          />
          <InputBox
            label="WIP Qty."
            name="wipQuantity"
            required={false}
            inputPlaceholder="WIP Qty."
            validateAsNumber
          />
        </div>
      }
    />
  );
};

export default AddCellPlannedPO;
