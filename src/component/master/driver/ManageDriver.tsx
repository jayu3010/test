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
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const ManageDriver = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [driverId, setDriverId] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const {
    addData,
    updateData,
    
    getQueryFetch,
    getListData,
    listData,
  }: any = useFetchData(service.API_URL?.drivers.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.manageDriver[0])}
          url={service?.API_URL?.drivers?.listing}
          exportUrl={service?.API_URL?.drivers?.export}
        />
      ),
    },
  ];

  const columns = [
    {
      title: 'Unit Name',
      dataIndex: 'unitName',
      sorter: {
        compare: commonSorter('unitName'),
        multiple: 3,
      },
    },
    {
      title: 'Driver Name',
      dataIndex: 'driverName',
      sorter: {
        compare: commonSorter('driverName'),
        multiple: 3,
      },
    },
    {
      title: 'Payroll',
      dataIndex: 'payroll',
      sorter: {
        compare: commonSorter('payroll'),
        multiple: 3,
      },
      render: (_, record: any) => <>{record?.driverEmpId ? 'Yes' : 'No'}</>,
    },

    {
      title: 'Emp Code',
      dataIndex: 'empCode',
      sorter: {
        compare: commonSorter('empCode'),
        multiple: 3,
      },
    },
    {
      title: 'Driver Number',
      dataIndex: 'driverNumber',
      sorter: {
        compare: commonSorter('driverNumber'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="drivers"
          idName="driverId"
          idValue={record.driverId}
          status={record.status}
          url={service?.API_URL?.drivers?.listing}
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
            onClick={() => handleEdit(record.driverId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.driverId} deleteUrl={service?.API_URL?.drivers?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      driverId: driverId || 0,
      isDelete: false,
    };
    if (driverId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.drivers.update
      );
      if (updateDataRes?.apiStatus) {
        setDriverId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(body, service?.API_URL?.drivers.add);
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setDriverId(id);
      const queryParams = { driverId: id };
      const apiUrl = service.API_URL.drivers.listing;
      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        form.setFieldsValue(editMachineRes[0]);
        dispatch(openModal());
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

  const modalListing = async () => {
    const apiUrls = {
      employees: service?.API_URL?.employees?.listing,
      unitList: service?.API_URL?.unitList?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setDriverId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Driver"
        exportUrl={service.API_URL.drivers.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={driverId ? 'Edit Driver' : 'Add Driver'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <SelectBox
              label="Unit Name"
              name="unitId"
              keyField="unitId"
              valueField="unitName"
              mode={false}
              required
              selectOptions={listData?.unitList}
              selectPlaceholder="Select Unit"
            />

            <InputBox
              label="Driver Name"
              name="driverName"
              required
              inputPlaceholder="Driver Name"
              validateAsNumber={false}
              validateAsString={false}
              max={50}
            />

            <SelectBox
              label="EMP Code"
              name="driverEmpId"
              keyField="empId"
              valueField="empCode"
              mode={false}
              required={false}
              selectOptions={listData?.employees}
              selectPlaceholder="Select EMP Code"
            />

            <InputBox
              label="Driver Number"
              name="driverNumber"
              required
              inputPlaceholder="Driver Number"
              validateAsNumber
              validateAsString={false}
              max={25}
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
      <TableComponent columns={columns} data={filterData || []} />
    </div>
  );
};

export default ManageDriver;
