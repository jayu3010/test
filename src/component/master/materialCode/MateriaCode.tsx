'use client';

import React, { useState } from 'react';
import { Button, Collapse, Form, Popconfirm, Select, Switch, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';

import CommonForm from '@/app/layout/commonForm/commonForm';
import Filter from '@/app/layout/filter/filter';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import { openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const MaterialCode = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [materialId, setMaterialId] = useState<any>();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { addData, updateData,  getQueryFetch }: any = useFetchData(
    service.API_URL?.materialsCode.listing
  );

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.materialCode[0])}
          url={service?.API_URL?.materialsCode?.listing}
          exportUrl={service?.API_URL?.materialsCode?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Material Code',
      dataIndex: 'materialCode',
      sorter: {
        compare: commonSorter('materialCode'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="Materials"
          idName="materialId"
          idValue={record.materialId}
          status={record.status}
          url={service?.API_URL?.materialsCode.listing}
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
            onClick={() => handleEdit(record.materialId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.materialId} deleteUrl={service?.API_URL?.materialsCode?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      materialId: materialId || 0,
      isDelete: false,
    };
    if (materialId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.materialsCode.update
      );
      if (updateDataRes?.apiStatus) {
        setMaterialId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(
        body,
        service?.API_URL?.materialsCode.add
      );
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setMaterialId(id);
      const queryParams = { materialId: id };
      const apiUrl = service.API_URL.materialsCode.listing;
      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        form.setFieldsValue(editMachineRes[0]);
        dispatch(openModal());
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    } finally {
    }
    // Perform your edit actions here
  };

  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Material Code"
        exportUrl={service.API_URL.materialsCode.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={materialId ? 'Edit Material Code' : 'Add Material Code'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Material Code"
              name="materialCode"
              required
              inputPlaceholder="Material Code"
              validateAsNumber={false}
              validateAsString={false}
              max={5}
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

export default MaterialCode;
