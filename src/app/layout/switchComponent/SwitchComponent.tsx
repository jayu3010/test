import React, { useState, useEffect } from 'react';
import { Button, Flex, Form, Modal, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { closeIcon, cnfrmIcon, saveIcon } from '@/utils/icons/icons';
import {
  addCloseModal,
  addOpenModal,
  reduxSliceData,
} from '@/utils/redux/features/reduxData';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

const SwitchComponent = ({ masterName, idName, idValue, status, url }: any) => {
  const modals = useSelector((state: any) => state.modals);
  const reduxData = useSelector((state: any) => state.reduxData?.statusId);
  const checkedStatus = useSelector(
    (state: any) => state.reduxData?.checkedStatus
  );

  const { commonSwitch } = useFetchData();

  const [isChecked, setIsChecked] = useState(status);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsChecked(status); // Sync the state with the incoming prop
  }, [status]);

  const handleChangeStatus = (checked: boolean, idValue: any) => {
    dispatch(addOpenModal('switch'));
    dispatch(reduxSliceData({ key: 'statusId', data: idValue }));
    dispatch(reduxSliceData({ key: 'checkedStatus', data: checked }));
  };

  const handleCancel = () => {
    dispatch(addCloseModal('switch'));
  };

  const handleSave = async () => {
    const body = {
      masterName,
      idName,
      idValue: reduxData,
      status: checkedStatus,
    };

    await commonSwitch(body, service?.API_URL?.commonSwitch.update, url);
  };

  return (
    <>
      <Form.Item name="status" className="form-item">
        <Switch
          checked={isChecked}
          onChange={(checked) => handleChangeStatus(checked, idValue)}
        />
      </Form.Item>
      <Modal
        className="main-modal"
        title=""
        centered
        open={modals.switch}
        footer={null} // Disable default footer buttons
        onCancel={handleCancel}
      >
        <div className="modal-content alternate">
          <p className="ant-upload-icon">{cnfrmIcon}</p>
          <p className="ant-upload-text dark:text-white">
            Are you sure you want to <br /> change this status?
          </p>
        </div>
        <Flex wrap className="gap-4 justify-center">
          <Button
            icon={closeIcon}
            className="btn-outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            icon={saveIcon}
            type="primary"
            className="btn-main"
            onClick={handleSave}
          >
            Save
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default SwitchComponent;
