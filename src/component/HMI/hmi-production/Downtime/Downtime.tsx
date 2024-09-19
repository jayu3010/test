'use client'
import React, { useState } from 'react';
import { Form, Switch, Button, Row, Col, Input, Modal, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeIcon, cnfrmIcon, saveIcon } from '@/utils/icons/icons';
import { addCloseModal, addOpenModal } from '@/utils/redux/features/reduxData';
import useFetchData from '@/utils/useFetchData/customFetchData';
import service from '@/utils/service/service';

const Downtime = () => {
  const modals = useSelector((state: any) => state.modals);
  const machinePartandLots :any= useSelector((state: any) => state.reduxData);
  const [tempSwitchId, setTempSwitchId] = useState<number | null>(null); // Track temporary switch before confirmation
  const [switchStatus, setSwitchStatus] = useState<{ [key: number]: boolean }>({}); // Track checked state per switch
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { addData }: any = useFetchData();

  // Initialize switch status based on workCenterDowntimes
  useState(() => {
    if (machinePartandLots?.workCenterDowntimes?.length > 0) {
      const initialSwitchStatus = machinePartandLots.workCenterDowntimes.reduce(
        (acc: any, downtime: any) => {
          acc[downtime.downtimeCategoryReasonId] = true; // Mark switch as checked for matching IDs
          return acc;
        },
        {}
      );
      setSwitchStatus(initialSwitchStatus);
    }
  }, [machinePartandLots?.workCenterDowntimes]);

  // Handle switch change (toggle)
  // Handle switch change (toggle)
  // Handle switch change (toggle)
  const handleSwitchChange = (downtimeCategoryReasonId: number) => {
    setTempSwitchId(downtimeCategoryReasonId);
    dispatch(addOpenModal('switch'));
  };

  const handleConfirmSwitchChange = () => {
    if (tempSwitchId !== null) {
      // Uncheck all other switches and check the confirmed one
      const updatedSwitchStatus = machinePartandLots.downtimeData.reduce(
        (acc: any, item: any) => {
          acc[item.downtimeCategoryReasonId] = item.downtimeCategoryReasonId === tempSwitchId;
          return acc;
        },
        {}
      );

      setSwitchStatus(updatedSwitchStatus); // Set the new switch status with only the confirmed one checked
      form.setFieldsValue({ downtimeCategoryReasonId: tempSwitchId });
      setTempSwitchId(null); // Reset the temp switch ID
    }
    dispatch(addCloseModal('switch')); // Close the modal
  };
  const handleCancel = () => {
    // Revert the switch state
    setTempSwitchId(null);
    dispatch(addCloseModal('switch'));
  };

  const handleSubmit = async (values: any) => {
    const body = {
      ...values,
      workCenterId: machinePartandLots.workCenterId,
    };
    const addDataRes = await addData(body, service?.API_URL?.hmi?.addDowntime);
    // Assuming there's a function to submit the data
    // await addData(body);
  };


  return (
    <>
      <Form form={form} onFinish={handleSubmit} className='downtime-form'>
        <Row gutter={[16, 16]}>
          {machinePartandLots?.downtimeData?.map((downtimeItem: any, index: number) => (
            <Col span={8} key={index}>
              <Form.Item className="form-item" name="downtimeCategoryReasonId">
                <Switch
                  checked={switchStatus[downtimeItem.downtimeCategoryReasonId] || false} // Get switch state
                  onChange={() => handleSwitchChange(downtimeItem.downtimeCategoryReasonId)}
                />
                <span>
                {downtimeItem.downtimeReason}
                </span>
              </Form.Item>
            </Col>
          ))}
        </Row>
        <div className='grid grid-cols-3 gap-x-6 gap-y-4'>
        <Form.Item name="remarks" className="form-item">
          <Input placeholder="Text" />
        </Form.Item>
        </div>
        <Button type="primary" htmlType="submit" className='btn-main'>
          Submit
        </Button>
      </Form>

      <Modal
        className="main-modal"
        title=""
        centered
        open={modals.switch}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="modal-content alternate">
          <p className="ant-upload-icon">{cnfrmIcon}</p>
          <p className="ant-upload-text dark:text-white">
            Are you sure you want to <br /> change this status?
          </p>
        </div>
        <Flex wrap className="gap-4 justify-center">
          <Button icon={closeIcon} className="btn-outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button icon={saveIcon} type="primary" className="btn-main" onClick={handleConfirmSwitchChange}>
            Save
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default Downtime;
