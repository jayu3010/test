'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Collapse,
  Form,
  Input,
  Popconfirm,
  Switch,
  Tag,
  TimePicker,
  Flex,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';

import CommonForm from '@/app/layout/commonForm/commonForm';
import Filter from '@/app/layout/filter/filter';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import SelectBox from '@/component/selectbox/selectbox';
import { openModal } from '@/utils/redux/features/reduxData';
import {
  commonSorter,
  extractTime,
  showFormattedTime,
} from '@/utils/functions/commonFunction';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const PreFunction = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [preFunctionId, setPreFunctionId] = useState('');

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { addData, updateData,  getQueryFetch } = useFetchData(
    service?.API_URL?.preFunctions.listing
  );

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.preFunctionFilter[0])}
          url={service?.API_URL?.preFunctions?.listing}
          exportUrl={service?.API_URL?.preFunctions?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Function',
      dataIndex: 'functionName',
      sorter: {
        compare: commonSorter('functionName'),
        multiple: 3,
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: {
        compare: commonSorter('description'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="PreFunctions"
          idName="preFunctionId"
          idValue={record.preFunctionId}
          status={record.status}
          url={service?.API_URL?.preFunctions?.listing}
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
            onClick={() => handleEdit(record.preFunctionId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.preFunctionId} deleteUrl={service?.API_URL?.preFunctions?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    const body = {
      ...data,
      preFunctionId: preFunctionId || 0,
      isDelete: false,
    };
    if (preFunctionId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.preFunctions.update
      );
      if (updateDataRes?.apiStatus) {
        setPreFunctionId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(
        body,
        service?.API_URL?.preFunctions.add
      );
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setPreFunctionId(id);
      const queryParams = { preFunctionId: id };
      const apiUrl = service.API_URL.preFunctions.getbyid;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        dispatch(openModal());
        form.setFieldsValue(editMachineRes[0]);
      } else {
        // Handle the case where apiStatus is false
        // You can set some error state here if needed
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    } finally {
    }
    // Perform your edit actions here
  };

  useEffect(() => {
    if (!openAddModal) {
      setPreFunctionId('');
    }
  }, [openAddModal]);

  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Pre Functions"
        exportUrl={service.API_URL.preFunctions.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={preFunctionId ? 'Edit Pre Functions' : 'Add Pre Functions'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Function"
              name="functionName"
              required
              inputPlaceholder="Function"
              validateAsNumber={false}
              validateAsString={false}
              max={30}
            />

            <InputBox
              label="Description"
              name="description"
              required
              inputPlaceholder="Description"
              validateAsNumber={false}
              validateAsString={false}
              max={100}
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

export default PreFunction;
