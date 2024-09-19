'use client';

import React, { useState } from 'react';
import { Button, Collapse, Form, Popconfirm, Switch, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';

import CommonForm from '@/app/layout/commonForm/commonForm';
import Filter from '@/app/layout/filter/filter';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import { openModal } from '@/utils/redux/features/reduxData';
import InputBox from '@/component/input/Input';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const ManageDocumentType = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [documentTypeId, setDocumentTypeId] = useState<any>();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { addData, updateData,  getItemById }: any = useFetchData(
    service?.API_URL?.documentTypeMaster.listing
  );

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.documentType[0])}
          url={service?.API_URL?.documentTypeMaster?.listing}
          exportUrl={service?.API_URL?.documentTypeMaster?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Document Type',
      dataIndex: 'documentTypeName',
      sorter: {
        compare: commonSorter('documentTypeName'),
        multiple: 3,
      },
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="DocumentTypes"
          idName="documentTypeId"
          idValue={record.documentTypeId}
          status={record.status}
          url={service?.API_URL?.documentTypeMaster?.listing}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button
            onClick={() => handleEdit(record.documentTypeId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.documentTypeId} deleteUrl={service?.API_URL?.documentTypeMaster?.listing} />
        </Flex>
      ),
    },
  ];
  const handleEdit = async (id: any) => {
    try {
      setDocumentTypeId(id);

      const editMachineRes: any = await getItemById(
        id,
        service.API_URL.documentTypeMaster.getbyid
      );
      if (editMachineRes) {
        dispatch(openModal());
        form.setFieldsValue(editMachineRes);
      } else {
        // Handle the case where apiStatus is false
        console.error('API call was not successful:', editMachineRes);
        // You can set some error state here if needed
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    } finally {
    }
    // Perform your edit actions here
  };
  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      documentTypeId: documentTypeId || 0,
      ...data,
    };
    if (documentTypeId) {
      await updateData(
        body,
        service?.API_URL?.documentTypeMaster.update,
        form.resetFields()
      );
      setDocumentTypeId('');
    } else {
      await addData(
        body,
        service?.API_URL?.documentTypeMaster.add,
        form.resetFields()
      );
    }
  };
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Document Type"
        exportUrl={service.API_URL.documentTypeMaster.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={documentTypeId ? 'Edit Document Type' : 'Add Document Type'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Document Type"
              name="documentTypeName"
              required
              inputPlaceholder="Document Type"
              validateAsNumber={false}
              validateAsString={false}
              max={50}
            />

            <CommonSwitch
              label="Status"
              name="status"
              checkedChildren="Active"
              unCheckedChildren="InActive"
            />
          </div>
        }
      />
      <div className="block-main__filter border-y-[1px] border-border py-4">
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div>
      <TableComponent columns={columns} data={filterData} />
    </div>
  );
};

export default ManageDocumentType;
