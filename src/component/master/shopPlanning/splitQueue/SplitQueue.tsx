import { Checkbox, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import CommonForm from '@/app/layout/commonForm/commonForm';
import InputBox from '@/component/input/Input';
import { addCloseModal } from '@/utils/redux/features/reduxData';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

const SplitQueue = ({ splitData, setQueueData }: any) => {
  const modals = useSelector((state: any) => state.modals);
  const { updateShopData }: any = useFetchData();

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    // Convert quantities to numbers
    const holdQty = Number(data.holdQty);
    const prodQty = Number(data.prodQty);
    const { qty } = splitData;

    // // Check if holdQty and prodQty are equal to qty
    if (holdQty + prodQty !== qty || holdQty <= 0 || prodQty <= 0) {
      message.error(
        'ProdQty and HoldQty must be greater than 0 and their sum must be equal to qty'
      );
      return; // Prevent submission
    }

    const body = {
      ...data,
      holdQty,
      prodQty,
      prodOrderId: splitData.prodOrderId,
    };
    try {
      const updateSplit = await updateShopData(
        body,
        service?.API_URL?.productionOrder.split
      );
      if (updateSplit.apiStatus) {
        dispatch(addCloseModal('splitQueue'));
      }
      console.log(
        '🚀 ~ constonFinish:SubmitHandler<FormData>= ~ updateSplit:',
        updateSplit
      );
      // Handle successful update if needed
    } catch (error) {
      // Handle error if needed
      message.error('Failed to update shop data');
    }
  };

  return (
    <CommonForm
      open={modals.splitQueue}
      mdlTitle="Split Queue"
      btnSubmit="Save"
      form={form}
      onFinish={onFinish}
      closeName="splitQueue"
      body={
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <InputBox
            label="Actual Production Qty."
            name=""
            required={false}
            inputPlaceholder="Prod. Qty."
            validateAsNumber={false}
            disabled
            inputDefaultValue={splitData?.qty}
          />
          <Form.Item />
          <InputBox
            label="Prod. Qty."
            name="prodQty"
            required
            inputPlaceholder="Prod. Qty."
            validateAsNumber
          />
          <InputBox
            label="Hold Qty."
            name="holdQty"
            required
            inputPlaceholder="Hold Qty.."
            validateAsNumber
          />
        </div>
      }
    />
  );
};

export default SplitQueue;
