'use client';

import React, { useState, useEffect } from 'react';
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
import { openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const MachineShopOf = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [machineLineId, setMachineLineId] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { addData, updateData, getQueryFetch } = useFetchData(
    service?.API_URL?.machineShopOf?.listing
  );

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.machineShopOf[0])}
          url={service?.API_URL?.machineShopOf?.listing}
          exportUrl={service?.API_URL?.machineShopOf?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'machineShopOfName',
      sorter: {
        compare: commonSorter('machineShopOfName'),
        multiple: 3,
      },
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="MachineShopOfs"
          idName="machineShopOfId"
          idValue={record.machineShopOfId}
          status={record.status}
          url={service?.API_URL?.machineShopOf?.listing}
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
            onClick={() => handleEdit(record.machineShopOfId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.machineShopOfId} deleteUrl={service?.API_URL?.machineShopOf?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      machineShopOfId: machineLineId || 0,
      isDelete: false,
    };
    if (machineLineId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.machineShopOf.update
      );
      if (updateDataRes?.apiStatus) {
        form.resetFields();
        setMachineLineId('');
      }
    } else {
      const addDataRes = await addData(
        body,
        service?.API_URL?.machineShopOf.add
      );
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setMachineLineId(id);
      const queryParams = { machineShopOfId: id };
      const apiUrl = service.API_URL.machineShopOf.listing;
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

  useEffect(() => {
    if (!openAddModal) {
      setMachineLineId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Machine Shop Of"
        exportUrl={service.API_URL.machineShopOf.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={
          machineLineId ? 'Edit Machine Shop Of' : 'Add Machine Shop Of'
        }
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Name"
              name="machineShopOfName"
              required
              inputPlaceholder="Name"
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

export default MachineShopOf;
