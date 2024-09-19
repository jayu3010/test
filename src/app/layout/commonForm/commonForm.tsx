import React, { useEffect } from 'react';
import { Button, Drawer, Flex, Form } from 'antd';
import { useDispatch } from 'react-redux';

import { addCloseModal, closeModal } from '@/utils/redux/features/reduxData';
import { closeIcon, saveIcon } from '@/utils/icons/icons';
import useIdStore from '@/utils/hook/useIdStore';

interface ModalProps {
  open: any;
  mdlTitle: string;
  btnSubmit: string;
  onFinish?: any;
  body?: any;
  closeName?: any;
  reset?: any;
  width?: any;
  form: any;
  initialValues?: any;
  setFileList?: any;
}

const CommonForm: React.FC<ModalProps> = ({
  open,
  mdlTitle,
  body,
  onFinish,
  form,
  width,
  closeName,
  initialValues,
  setFileList,
}) => {
  const dispatch = useDispatch();
  const onClose = () => {
    if (setFileList) {
      setFileList([]);
    }
    form.resetFields();
    if (closeName) {
      dispatch(addCloseModal(closeName));
    } else {
      dispatch(closeModal());
    }
  };

  return (
    <Drawer
      title={mdlTitle}
      className="form-drawer dark:bg-black-900"
      width={width || 1000}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        className="main-form flex justify-between h-full flex-col"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        {body}
        <Flex wrap className="gap-4 justify-end form-footer">
          <Button className="btn-outline" onClick={onClose}>
            {closeIcon}Cancel{' '}
          </Button>
          <Button type="primary" htmlType="submit" className="btn-main">
            {saveIcon} Save{' '}
          </Button>
        </Flex>
      </Form>
    </Drawer>
  );
};

export default CommonForm;
