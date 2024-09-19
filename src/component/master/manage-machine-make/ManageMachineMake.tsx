'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Collapse,
  Form,
  Input,
  Popconfirm,
  Select,
  Switch,
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
import InputBox from '@/component/input/Input';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const { Option } = Select;
const ManageMake = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [machineMakeId, setMachineMakeId] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { addData, getItemById, updateData, getListData }: any =
    useFetchData(service?.API_URL?.machineMake?.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.manageMachineMake[0])}
          url={service?.API_URL?.machineMake?.listing}
          exportUrl={service?.API_URL?.machineMake?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Machine Make',
      dataIndex: 'machineMake',
      sorter: {
        compare: commonSorter('machineMake'),
        multiple: 3,
      },
    },
    {
      title: 'Manufacturing Country',
      dataIndex: 'manufacturingCountry',
      sorter: {
        compare: commonSorter('manufacturingCountry'),
        multiple: 3,
      },
      render: (text: any) => text?.charAt(0).toUpperCase() + text?.slice(1),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="MachineMakes"
          idName="machineMakeId"
          idValue={record.machineMakeId}
          status={record.status}
          url={service?.API_URL?.machineMake?.listing}
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
            onClick={() => handleEdit(record.machineMakeId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.machineMakeId} deleteUrl={service?.API_URL?.machineMake?.listing} />
        </Flex>
      ),
    },
  ];
  const handleEdit = async (id: any) => {
    try {
      setMachineMakeId(id);
      const editMachineRes: any = await getItemById(
        id,
        service.API_URL.machineMake.getbyid
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
      ...data,
      machineMakeId: machineMakeId || 0,
      isDelete: false,
    };
    if (machineMakeId) {
      await updateData(
        body,
        service?.API_URL?.machineMake.update,
        form.resetFields()
      );
      setMachineMakeId('');
    } else {
      await addData(
        body,
        service?.API_URL?.machineMake.add,
        form.resetFields()
      );
    }
  };
  const modalListing = async () => {
    const apiUrls = {
      machineShop: service?.API_URL?.machineShop?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setMachineMakeId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Machine Make"
        exportUrl={service.API_URL.machineMake.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={machineMakeId ? 'Edit  Machine Make' : 'Add Machine Make'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Machine Make"
              name="machineMake"
              required
              inputPlaceholder="Machine Make"
              validateAsNumber={false}
              validateAsString={false}
              max={20}
            />

            <SelectBox
              label="Manufacturing Country"
              name="manufacturingCountry"
              keyField="value"
              valueField="label"
              mode={false}
              required
              selectOptions={[{ value: 'india', label: 'India' }]}
              selectPlaceholder="Manufacturing Country"
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

export default ManageMake;
