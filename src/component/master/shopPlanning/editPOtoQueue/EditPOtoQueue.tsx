import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Form, Radio, message } from 'antd';

import CommonForm from '@/app/layout/commonForm/commonForm';
import InputBox from '@/component/input/Input';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import { addCloseModal } from '@/utils/redux/features/reduxData';

const EditPOtoQueue = ({ form, queueData }: any) => {
  const modals = useSelector((state: any) => state.modals);
  const { updateData, getListData } = useFetchData();
  const [selectedValue, setSelectedValue] = useState(null);
  const dispatch = useDispatch();

  const onFinish = async (data: any) => {
    const body = {
      ...data,
      prodOrderId: queueData.prodOrderId,
      isDelete: false,
    };
    const updatePoData = await updateData(
      body,
      service?.API_URL?.productionOrder.add
    );
    if (updatePoData.apiStatus) {
      dispatch(addCloseModal('editQueue'));
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
    if (modals.editQueue) {
      modalListing();
    }
  }, [modals.editQueue]);

  useEffect(() => {
    form.setFieldsValue({
      productionOrderLots: [{ qty: 0 }],
    });
  }, [form]);
  const handleChange = (e) => {
    setSelectedValue(e.target.checked);
  };
  return (
    <CommonForm
      open={modals.editQueue}
      mdlTitle="Edit PO to Queue"
      btnSubmit="Save"
      form={form}
      onFinish={onFinish}
      closeName="editQueue"
      initialValues={{ productionOrderLots: [{ qty: 0 }] }}
      body={
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
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
          <InputBox
            label="Qty."
            name="qty"
            required
            inputPlaceholder="Qty."
            validateAsNumber
            onChange={() => {
              const qty = form.getFieldValue('qty');
              form.setFieldsValue({
                productionOrderLots: [{ qty }],
              });
            }}
          />
          {/* <Form.Item label="" name="status" className="form-item" style={{ marginTop: '32px' }}>
              <Radio.Group
                name="radiogroup"
                defaultValue="runBatchWise"
                className='only-radio-group'
                onChange={(e) => setRunBatchWise(e.target.value === 'runBatchWise')}
              >
                <Radio value="runBatchWise">Run Batch Wise</Radio>
                <Radio value="moveOn">Move On</Radio>
              </Radio.Group>
            </Form.Item> */}

          <Form.Item />

          {queueData.moveOn == false && (
            <>
              <Form.Item
                label="Machine Shop Options"
                name="partOfMachineShop"
                className="form-item"
              >
                <Checkbox onChange={handleChange} value="moveOn">
                  Move On
                </Checkbox>
              </Form.Item>
              {selectedValue && (
                <InputBox
                  label="Move On Qty."
                  name="moveOnQty"
                  required={false}
                  inputPlaceholder="Qty."
                  validateAsNumber
                />
              )}
            </>
          )}

          <div />
          {/* {selec && <QtySplit />} */}
        </div>
      }
    />
  );
};

export default EditPOtoQueue;
