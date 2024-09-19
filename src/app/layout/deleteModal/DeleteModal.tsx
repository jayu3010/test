'use client'
import React from 'react';
import { Button, Flex, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { closeIcon, cnfrmIcon, dltIcon, saveIcon } from '@/utils/icons/icons';
import {
    addCloseModal,
    addOpenModal,
} from '@/utils/redux/features/reduxData';
import useFetchData from '@/utils/useFetchData/customFetchData';

const DeleteModal = ({ id, deleteUrl }: any) => {
    const modals = useSelector((state: any) => state.modals);
    const { deleteItem } = useFetchData();


    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(addCloseModal('deleteModal'));
    };
    const handleSave = async () => {
        await deleteItem(id, deleteUrl);
    };
    const handleDelete = () => {
        dispatch(addOpenModal('deleteModal'));
    };
    return (
        <>
            <Button onClick={handleDelete}> {dltIcon}</Button>
            <Modal
                className="main-modal"
                title=""
                centered
                onCancel={handleCancel}
                open={modals.deleteModal}
                footer={null} // Disable default footer buttons
            >
                <div className="modal-content alternate">
                    <p className="ant-upload-icon">{cnfrmIcon}</p>
                    <p className="ant-upload-text dark:text-white">
                        Are you sure you want to <br /> delete this record?
                    </p>
                </div>
                <Flex wrap className="gap-4 justify-center">
                    <Button
                        icon={closeIcon}
                        className="btn-outline"
                        onClick={handleCancel}
                    >
                        No
                    </Button>
                    <Button
                        icon={saveIcon}
                        type="primary"
                        className="btn-main"
                        onClick={handleSave}
                    >
                        Yes
                    </Button>
                </Flex>
            </Modal>
        </>
    );
};

export default DeleteModal;
