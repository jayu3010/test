import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Radio, Switch } from 'antd';
import { SubmitHandler } from 'react-hook-form';

import CommonForm from '@/app/layout/commonForm/commonForm';
import InputBox from '@/component/input/Input';
import SelectBox from '@/component/selectbox/selectbox';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import { addCloseModal } from '@/utils/redux/features/reduxData';

const AddPOtoQueue = () => {
  const modals = useSelector((state: any) => state.modals);
  const { addData, listData, getListData, getQueryFetch }: any = useFetchData();
  const [form] = Form.useForm();
  const[machineName,setMachineName]=useState('')
  const dispatch = useDispatch();
  const onFinish = async (data: any) => {
    const body = {
      ...data,
      prodOrderId: 0,
      isDelete: false,
      isPlannedOrder: true,
      salesOrderId: Number(data?.salesOrderId),
    };

    const addPores = await addData(body, service?.API_URL?.productionOrder.add);
    if (addPores.apiStatus) {
      dispatch(addCloseModal('addPOtoQueue'));
      form.resetFields();
    }
  };
  const modalListing = async () => {
    const apiUrls = {
      machinePart: service?.API_URL?.machineparts?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (modals.addPOtoQueue) {
      modalListing();
    }
  }, [modals.addPOtoQueue]);
  const handleMultiSelectChange = async (selectedValues: any) => {
    const queryParams = { partNo: selectedValues };
    const getMachineData: any = await getQueryFetch(
      queryParams,
      service.API_URL.machineparts.listing
    );
    const partName = getMachineData[0]?.partName;

    // Set machine name in the form
    form.setFieldsValue({
      partName: partName,
    });
  };
  return (
    <CommonForm
      open={modals.addPOtoQueue}
      mdlTitle="Add PO to Queue"
      btnSubmit="Save"
      form={form}
      onFinish={onFinish}
      closeName="addPOtoQueue"
      body={
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <InputBox
            label="Production Order No."
            name="prodOrderNo"
            required
            inputPlaceholder="Production Order No."
            validateAsNumber={false}
            validateAsString={false}
            max={10}
          />
          <InputBox
            label="Sales Order No."
            name="salesOrderId"
            required
            inputPlaceholder="Sales Order No. "
            validateAsNumber
            validateAsString={false}
          />
          <SelectBox
            label="Part Number"
            name="partNo"
            keyField="partNo"
            valueField="partNo"
            mode={false}
            required
            selectOptions={listData.machinePart}
            selectPlaceholder="Part Number"
            handleMultiSelectChange={(value) => handleMultiSelectChange(value)}
          />

          <Form.Item
            label="Part Name"
            name="partName"
            className="form-item"
            rules={[{ required: false }]}
            
          >
            <Input disabled maxLength={20} />
          </Form.Item>
          <InputBox
            label="Qty. "
            name="qty"
            required
            inputPlaceholder="Qty. "
            validateAsNumber={false}
            validateAsString={false}
          />
          <InputBox
            label="Priority 1"
            name="priority1"
            required
            inputPlaceholder="Priority 1"
            validateAsNumber={false}
            validateAsString={false}
          />
          <InputBox
            label="Priority 2"
            name="priority2"
            required={false}
            inputPlaceholder="Priority 2"
            validateAsNumber={false}
            validateAsString={false}
          />
        </div>
      }
    />
  );
};

export default AddPOtoQueue;
