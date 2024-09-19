import { Form } from 'antd';
import React, { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import CommonForm from '@/app/layout/commonForm/commonForm';
import InputBox from '@/component/input/Input';
import SelectBox from '@/component/selectbox/selectbox';
import { addCloseModal } from '@/utils/redux/features/reduxData';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

const UnplannedPO = () => {
  const modals = useSelector((state: any) => state.modals);
  const [form] = Form.useForm();
  const { addData, listData, getListData }: any = useFetchData();
  const dispatch = useDispatch();

  const onFinish = async (data: any) => {
    const body = {
      ...data,
      prodOrderId: 0,
      isPlannedOrder: false,
      salesOrderId: Number(data?.salesOrderId),
      isDelete: false,
    };
    const addPores = await addData(body, service?.API_URL?.productionOrder.add);
    if (addPores.apiStatus) {
      dispatch(addCloseModal('addUnplannedPO'));
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
    if (modals.addUnplannedPO) {
      modalListing();
    }
  }, [modals.addUnplannedPO]);
  return (
    <CommonForm
      open={modals.addUnplannedPO}
      mdlTitle="Add Unplanned PO"
      btnSubmit="Save"
      form={form}
      onFinish={onFinish}
      closeName="addUnplannedPO"
      body={
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <InputBox
            label="Production Order No."
            name="prodOrderNo"
            required
            inputPlaceholder="Production Order No."
            validateAsNumber={false}
            validateAsString={false}
          />
          <InputBox
            label="Sales Order No."
            name="salesOrderId"
            required
            inputPlaceholder="Sales Order No. "
            validateAsNumber={false}
            validateAsString={false}
          />
          <SelectBox
            label="Part Number"
            name="partNo"
            keyField="partNo"
            valueField="partName"
            mode={false}
            required
            selectOptions={listData.machinePart}
            selectPlaceholder="Part Number"
          />
          <InputBox
            label="Part Name"
            name=""
            required={false}
            inputPlaceholder="Part Name"
            validateAsNumber={false}
            validateAsString={false}
            disabled
          />
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

export default UnplannedPO;
